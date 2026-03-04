import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZakatService } from '../../../features/services/zakat.service';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { BanglaFixedPipe } from '../../../features/pipe/bangla-fixed.pipe';
import { LoaderComponent } from "../../../components/loader/loader.component";
import { JsonDataService } from '../../../features/services/json-data.service';

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

@Component({
  selector: 'app-zakat',
  templateUrl: './zakat.component.html',
  styleUrl: './zakat.component.css',
  imports: [FormsModule, CommonModule, BengaliDatePipe, BanglaFixedPipe, LoaderComponent]
})
export class ZakatComponent implements OnInit {
  // Services
  private jsonDataService = inject(JsonDataService);
  private zakatService = inject(ZakatService);
  
  // State signals
  private forayezSignal = signal<ZakatData | null>(null);
  readonly unitSignal = signal<'ভরি' | 'গ্রাম'>('ভরি');
  
  // Constants
  private readonly GRAM_PER_VORI = 11.664;
  private readonly SELLING_PRICE_DISCOUNT = 0.85; // 15% discount from buying price
  
  // Computed signals
  readonly forayez = this.forayezSignal.asReadonly();
  readonly isLoading = computed(() => this.forayezSignal() === null);
  readonly currentUnit = this.unitSignal.asReadonly();
  
  // Dynamic computed values for gold
  readonly gold22kValues = computed(() => this.calculateValues('gold22k'));
  readonly gold21kValues = computed(() => this.calculateValues('gold21k'));
  readonly gold18kValues = computed(() => this.calculateValues('gold18k'));
  readonly goldTdValues = computed(() => this.calculateValues('goldTd'));
  
  // Dynamic computed values for silver
  readonly silver22kValues = computed(() => this.calculateValues('silver22k'));
  readonly silver21kValues = computed(() => this.calculateValues('silver21k'));
  readonly silver18kValues = computed(() => this.calculateValues('silver18k'));
  readonly silverTdValues = computed(() => this.calculateValues('silverTd'));
  
  // Gold and silver items for template iteration
  readonly goldItems = computed(() => [
    { label: '২২ ক্যারেট', values: this.gold22kValues(), bgClass: 'bg-yellow-200' },
    { label: '২১ ক্যারেট', values: this.gold21kValues(), bgClass: 'bg-yellow-300' },
    { label: '১৮ ক্যারেট', values: this.gold18kValues(), bgClass: 'bg-yellow-200' },
    { label: 'সনাতনী', values: this.goldTdValues(), bgClass: 'bg-yellow-300 border-b border-black' }
  ]);
  
  readonly silverItems = computed(() => [
    { label: '২২ ক্যারেট', values: this.silver22kValues(), bgClass: 'bg-gray-200' },
    { label: '২১ ক্যারেট', values: this.silver21kValues(), bgClass: 'bg-gray-300' },
    { label: '১৮ ক্যারেট', values: this.silver18kValues(), bgClass: 'bg-gray-200' },
    { label: 'সনাতনী', values: this.silverTdValues(), bgClass: 'bg-gray-300 border-b border-black' }
  ]);

  constructor() {}

  ngOnInit(): void {
    this.loadZakatData();
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
   * Update unit selection
   */
  updateUnit(unit: 'ভরি' | 'গ্রাম'): void {
    this.unitSignal.set(unit);
  }

  /**
   * Calculate buying and selling prices based on current unit
   */
  private calculateValues(key: keyof ZakatData): { buyingPrice: number; sellingPrice: number } | null {
    const data = this.forayezSignal();
    if (!data?.[key]) return null;
    
    const baseValue = data[key] as number;
    const unit = this.unitSignal();
    
    // Convert to ভরি if needed
    const valueInVori = unit === 'ভরি' ? baseValue * this.GRAM_PER_VORI : baseValue;
    
    return {
      buyingPrice: valueInVori,
      sellingPrice: valueInVori * this.SELLING_PRICE_DISCOUNT
    };
  }

  /**
   * TrackBy function for performance
   */
  trackByLabel(index: number, item: any): string {
    return item.label;
  }
}