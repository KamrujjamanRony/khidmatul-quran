import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BengaliNumberPipe } from "../../../features/pipe/bengali-number.pipe";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { HttpClient } from '@angular/common/http';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { ZakatService } from '../../../features/services/zakat.service';
// import { HijriDateAdjService } from '../../../features/services/hijri-date-adj.service';
import { BanglaFixedPipe } from "../../../features/pipe/bangla-fixed.pipe";
import { JsonDataService } from '../../../features/services/json-data.service';
import { DateUtilService } from '../../../features/services/date-util.service';

@Component({
  selector: 'app-zakat-calculator',
  templateUrl: './zakat-calculator.component.html',
  styleUrl: './zakat-calculator.component.css',
  imports: [FormsModule, BengaliNumberPipe, CommonModule, BengaliDatePipe, BanglaFixedPipe]
})
export class ZakatCalculatorComponent {
  ZakatService = inject(ZakatService);
  dateUtil = inject(DateUtilService);
  jsonDataService = inject(JsonDataService);
  // HijriDateAdjService = inject(HijriDateAdjService);
  dataService = inject(JsonDataService);
  datePipe: DatePipe = new DatePipe('en-US');
  forayez = signal<any>(null);
  model: any;
  totalGold = signal<any>(0);
  totalSilver = signal<any>(0);
  today: any;
  asset = signal<string>('ভরি');
  hijriDate = signal<any>(null);


  constructor(private readonly http: HttpClient) {
    // Initialize model properties
    this.model = {
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

  ngOnInit(): void {
    this.jsonDataService.getZakatData().subscribe(data => {
      if (data?.gold22k) {
        this.forayez.set(data);
      } else {
        this.ZakatService.getZakat().subscribe(Response => {
          this.forayez.set(Response);
        })
      }
    });
    this.dataService.getHijriDateAdjData().subscribe(data => {
      const dateAdj = data?.dateAdj | 0;
      this.hijriDate.set(this.dateUtil.getHijriDate(dateAdj));
    })
    // this.HijriDateAdjService.getHijriDate().subscribe(data => {
    //   this.hijriDate.set(data?.hijriDate);
    // });
    this.today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  onInputChange(event: any) {
    const { gold_22, gold_21, gold_18, gold_td, silver_22, silver_21, silver_18, silver_td } = this.model;
    const { gold22k, gold21k, gold18k, goldTd, silver22k, silver21k, silver18k, silverTd } = this.forayez();
    this.totalGold.set((gold_22 * gold22k * 0.8) + (gold_21 * gold21k * 0.8) + (gold_18 * gold18k * 0.8) + (gold_td * goldTd * 0.8));
    this.totalSilver.set((silver_22 * silver22k * 0.8) + (silver_21 * silver21k * 0.8) + (silver_18 * silver18k * 0.8) + (silver_td * silverTd * 0.8));
  }

  generatePDF() {
    var data: any = document.getElementById('MakePdf');  //Id of the table

    html2canvas(data, { scale: 2 }).then(canvas => {
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      pdf.setFontSize(100);
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }



  onReset() {
    this.model = {
      gold_22: 0,
      gold_21: 0,
      gold_18: 0,
      gold_td: 0,
      silver_22: 0,
      silver_21: 0,
      silver_18: 0,
      silver_td: 0,
      totalCashTk: 0,
      totalPawnaTk: 0,
      businessWealth: 0,
      bankAccount: 0,
      mobileBanking: 0,
      debt: 0,
    };
    this.totalGold.set(0),
      this.totalSilver.set(0)
  }

}
