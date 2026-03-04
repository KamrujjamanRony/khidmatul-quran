import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

import { BengaliNumberPipe } from "../../../features/pipe/bengali-number.pipe";
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { BanglaFixedPipe } from "../../../features/pipe/bangla-fixed.pipe";
import { ZakatService } from '../../../features/services/zakat.service';
import { JsonDataService } from '../../../features/services/json-data.service';
import { DateUtilService } from '../../../features/services/date-util.service';

interface ZakatData {
  gold22k: number;
  gold21k: number;
  gold18k: number;
  goldTd: number;
  silver22k: number;
  silver21k: number;
  silver18k: number;
  silverTd: number;
  updateDate: string;
  [key: string]: any;
}

export interface CalculatorModel {
  gold_22: number | null;
  gold_21: number | null;
  gold_18: number | null;
  gold_td: number | null;
  silver_22: number | null;
  silver_21: number | null;
  silver_18: number | null;
  silver_td: number | null;
  totalCashTk: number | null;
  totalPawnaTk: number | null;
  businessPurposes: number | null;
  businessDue: number | null;
  businessCash: number | null;
  bankAccount: number | null;
  mobileBanking: number | null;
  debt: number | null;
}

// Type for gold and silver item keys
type GoldItemKey = 'gold_22' | 'gold_21' | 'gold_18' | 'gold_td';
type SilverItemKey = 'silver_22' | 'silver_21' | 'silver_18' | 'silver_td';

interface GoldItem {
  key: GoldItemKey;
  label: string;
  value: number;
  priceKey: keyof ZakatData;
}

interface SilverItem {
  key: SilverItemKey;
  label: string;
  value: number;
  priceKey: keyof ZakatData;
}

interface SummaryItem {
  key?: string;
  label: string;
  value: number;
  condition: boolean;
}

@Component({
  selector: 'app-zakat-calculator',
  templateUrl: './zakat-calculator.component.html',
  styleUrl: './zakat-calculator.component.css',
  imports: [FormsModule, CommonModule, BengaliNumberPipe, BengaliDatePipe, BanglaFixedPipe]
})
export class ZakatCalculatorComponent implements OnInit {
  // Services
  private zakatService = inject(ZakatService);
  private jsonDataService = inject(JsonDataService);
  private dateUtil = inject(DateUtilService);
  private http = inject(HttpClient);
  private datePipe = new DatePipe('en-US');

  // Constants
  private readonly GRAM_PER_VORI = 11.664;
  private readonly SELLING_PRICE_DISCOUNT = 0.85; // 15% discount from buying price
  private readonly ZAKAT_RATE = 40; // 2.5% = 1/40

  // State signals
  private forayezSignal = signal<ZakatData | null>(null);
  private hijriDateSignal = signal<string | null>(null);
  private todaySignal = signal<string>(this.datePipe.transform(new Date(), 'dd/MM/yyyy') || '');
  
  // Model signal
  private modelSignal = signal<CalculatorModel>(this.getInitialModel());
  
  // Unit selection signal
  readonly unitSignal = signal<'ভরি' | 'গ্রাম'>('ভরি');
  
  // PDF generation state
  private isPdfGenerating = signal(false);
  
  // Computed signals (readonly exports)
  readonly forayez = this.forayezSignal.asReadonly();
  readonly hijriDate = this.hijriDateSignal.asReadonly();
  readonly today = this.todaySignal.asReadonly();
  readonly model = this.modelSignal.asReadonly();
  readonly currentUnit = this.unitSignal.asReadonly();
  readonly isGeneratingPdf = this.isPdfGenerating.asReadonly();

  // Computed values for gold and silver totals
  readonly goldValues = computed(() => {
    const data = this.forayezSignal();
    const model = this.modelSignal();
    const unit = this.unitSignal();
    
    if (!data) return null;

    const calculateValue = (quantity: number | null, price: number): number => {
      if (!quantity) return 0;
      const baseValue = quantity * price * this.SELLING_PRICE_DISCOUNT;
      return unit === 'ভরি' ? baseValue * this.GRAM_PER_VORI : baseValue;
    };

    return {
      gold22: calculateValue(model.gold_22, data.gold22k),
      gold21: calculateValue(model.gold_21, data.gold21k),
      gold18: calculateValue(model.gold_18, data.gold18k),
      goldTd: calculateValue(model.gold_td, data.goldTd)
    };
  });

  readonly silverValues = computed(() => {
    const data = this.forayezSignal();
    const model = this.modelSignal();
    const unit = this.unitSignal();
    
    if (!data) return null;

    const calculateValue = (quantity: number | null, price: number): number => {
      if (!quantity) return 0;
      const baseValue = quantity * price * this.SELLING_PRICE_DISCOUNT;
      return unit === 'ভরি' ? baseValue * this.GRAM_PER_VORI : baseValue;
    };

    return {
      silver22: calculateValue(model.silver_22, data.silver22k),
      silver21: calculateValue(model.silver_21, data.silver21k),
      silver18: calculateValue(model.silver_18, data.silver18k),
      silverTd: calculateValue(model.silver_td, data.silverTd)
    };
  });

  readonly totalGold = computed(() => {
    const values = this.goldValues();
    if (!values) return 0;
    return values.gold22 + values.gold21 + values.gold18 + values.goldTd;
  });

  readonly totalSilver = computed(() => {
    const values = this.silverValues();
    if (!values) return 0;
    return values.silver22 + values.silver21 + values.silver18 + values.silverTd;
  });

  readonly totalJewelry = computed(() => {
    return this.totalGold() + this.totalSilver();
  });

  readonly totalCashAssets = computed(() => {
    const model = this.modelSignal();
    return (model.totalCashTk || 0) + (model.totalPawnaTk || 0);
  });

  readonly totalBusinessAssets = computed(() => {
    const model = this.modelSignal();
    return (model.businessPurposes || 0) + (model.businessDue || 0) + (model.businessCash || 0);
  });

  readonly totalBankAssets = computed(() => {
    const model = this.modelSignal();
    return (model.bankAccount || 0) + (model.mobileBanking || 0);
  });

  readonly totalAssets = computed(() => {
    return this.totalJewelry() + 
           this.totalCashAssets() + 
           this.totalBusinessAssets() + 
           this.totalBankAssets();
  });

  readonly totalDebt = computed(() => {
    return this.modelSignal().debt || 0;
  });

  readonly zakatableAssets = computed(() => {
    return Math.max(0, this.totalAssets() - this.totalDebt());
  });

  readonly zakatAmount = computed(() => {
    return this.zakatableAssets() / this.ZAKAT_RATE;
  });

  // Gold and silver items for template iteration with proper typing
  readonly goldItems = computed<GoldItem[]>(() => {
    const values = this.goldValues();
    return [
      { key: 'gold_22', label: '২২ ক্যারেট', value: values?.gold22 || 0, priceKey: 'gold22k' },
      { key: 'gold_21', label: '২১ ক্যারেট', value: values?.gold21 || 0, priceKey: 'gold21k' },
      { key: 'gold_18', label: '১৮ ক্যারেট', value: values?.gold18 || 0, priceKey: 'gold18k' },
      { key: 'gold_td', label: 'সনাতনী', value: values?.goldTd || 0, priceKey: 'goldTd' }
    ];
  });

  readonly silverItems = computed<SilverItem[]>(() => {
    const values = this.silverValues();
    return [
      { key: 'silver_22', label: '২২ ক্যারেট', value: values?.silver22 || 0, priceKey: 'silver22k' },
      { key: 'silver_21', label: '২১ ক্যারেট', value: values?.silver21 || 0, priceKey: 'silver21k' },
      { key: 'silver_18', label: '১৮ ক্যারেট', value: values?.silver18 || 0, priceKey: 'silver18k' },
      { key: 'silver_td', label: 'সনাতনী', value: values?.silverTd || 0, priceKey: 'silverTd' }
    ];
  });

  // Summary items for PDF display
  readonly summaryItems = computed<SummaryItem[]>(() => {
    const model = this.modelSignal();
    return [
      { label: 'মোট জুয়েলারি মূল্য', value: this.totalJewelry(), condition: this.totalJewelry() > 0 },
      { label: 'মোট ক্যাশ টাকা', value: model.totalCashTk || 0, condition: (model.totalCashTk || 0) > 0 },
      { label: 'মোট পাওনা টাকা', value: model.totalPawnaTk || 0, condition: (model.totalPawnaTk || 0) > 0 },
      { label: 'মোট ব্যবসায়িক সম্পদ', value: this.totalBusinessAssets(), condition: this.totalBusinessAssets() > 0 },
      { label: 'ব্যাংক অ্যাকাউন্টে জমা', value: model.bankAccount || 0, condition: (model.bankAccount || 0) > 0 },
      { label: 'মোবাইল ব্যাংকিং এ জমা', value: model.mobileBanking || 0, condition: (model.mobileBanking || 0) > 0 },
      { label: 'বিয়োগযোগ্য ঋণ ও দায়', value: model.debt || 0, condition: (model.debt || 0) > 0 }
    ];
  });

  constructor() {}

  ngOnInit(): void {
    this.loadZakatData();
    this.loadHijriDate();
  }

  /**
   * Get initial empty model
   */
  private getInitialModel(): CalculatorModel {
    return {
      gold_22: null,
      gold_21: null,
      gold_18: null,
      gold_td: null,
      silver_22: null,
      silver_21: null,
      silver_18: null,
      silver_td: null,
      totalCashTk: null,
      totalPawnaTk: null,
      businessPurposes: null,
      businessDue: null,
      businessCash: null,
      bankAccount: null,
      mobileBanking: null,
      debt: null,
    };
  }

  /**
   * Load zakat data from either local JSON or API
   */
  private loadZakatData(): void {
    this.jsonDataService.getZakatData().subscribe({
      next: (data) => {
        if (data?.gold22k) {
          this.forayezSignal.set(data);
        } else {
          this.fetchFromApi();
        }
      },
      error: () => this.fetchFromApi()
    });
  }

  /**
   * Fetch zakat data from API
   */
  private fetchFromApi(): void {
    this.zakatService.getZakat().subscribe({
      next: (response) => this.forayezSignal.set(response),
      error: (error) => {
        console.error('Failed to load zakat data:', error);
        this.forayezSignal.set(null);
      }
    });
  }

  /**
   * Load Hijri date
   */
  private loadHijriDate(): void {
    this.jsonDataService.getHijriDateAdjData().subscribe({
      next: (data) => {
        const dateAdj = data?.dateAdj || 0;
        this.hijriDateSignal.set(this.dateUtil.getHijriDate(dateAdj));
      },
      error: (error) => {
        console.error('Failed to load Hijri date:', error);
        this.hijriDateSignal.set(null);
      }
    });
  }

  /**
   * Update unit selection
   */
  updateUnit(unit: 'ভরি' | 'গ্রাম'): void {
    this.unitSignal.set(unit);
  }

  /**
   * Handle input changes
   */
  onInputChange(): void {
    // Model is already updated via ngModel, no need to do anything
    // All computed signals will automatically update
  }

  /**
   * Update model field with type-safe key
   */
  updateModelField<K extends keyof CalculatorModel>(field: K, value: any): void {
    this.modelSignal.update(model => ({
      ...model,
      [field]: value === '' ? null : Number(value)
    }));
  }

  /**
   * Type-safe getter for model values in template
   */
  getModelValue<K extends keyof CalculatorModel>(field: K): CalculatorModel[K] {
    return this.modelSignal()[field];
  }

  /**
   * Reset all form fields
   */
  onReset(): void {
    this.modelSignal.set(this.getInitialModel());
  }

  /**
   * Generate PDF with improved quality and error handling
   */
  async generatePDF(): Promise<void> {
    if (this.isPdfGenerating()) {
      return; // Prevent multiple simultaneous PDF generations
    }

    this.isPdfGenerating.set(true);

    try {
      const element = document.getElementById('MakePdf');
      if (!element) {
        throw new Error('PDF element not found');
      }

      // Store original styles
      const originalOverflow = document.body.style.overflow;
      const originalPosition = (element as HTMLElement).style.position;
      
      // Temporarily fix element position for better capture
      document.body.style.overflow = 'visible';
      (element as HTMLElement).style.position = 'relative';

      // Capture with high quality settings
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        logging: false,
        allowTaint: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Restore original styles
      document.body.style.overflow = originalOverflow;
      (element as HTMLElement).style.position = originalPosition;

      // Create PDF with proper dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate image dimensions to fit PDF while maintaining aspect ratio
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
      const width = imgWidth * ratio;
      const height = imgHeight * ratio;
      
      // Center the image on page
      const x = (pdfWidth - width) / 2;
      const y = (pdfHeight - height) / 2;

      pdf.addImage(imgData, 'PNG', x, y, width, height);
      
      // Add metadata
      pdf.setProperties({
        title: 'Zakat Calculation Report',
        subject: 'Zakat Calculator',
        author: 'Islamic App',
        keywords: 'zakat, islamic, calculator',
        creator: 'Zakat Calculator App'
      });

      // Save with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      pdf.save(`Zakat_Report_${timestamp}.pdf`);

    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      this.isPdfGenerating.set(false);
    }
  }

  /**
   * TrackBy function for performance
   */
  trackByKey(index: number, item: GoldItem | SilverItem | SummaryItem): string {
    return item.key || item.label || index.toString();
  }

  /**
   * Safe pipe handler for hijri date
   */
  getSafeHijriDate(): string {
    return this.hijriDateSignal() || '';
  }
}