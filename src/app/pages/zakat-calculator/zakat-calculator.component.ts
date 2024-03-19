import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BanglaPipe } from '../../features/pipe/bangla.pipe';
import { FormsModule } from '@angular/forms';
import { ForayezService } from '../../features/services/forayez.service';
import { DatePipe } from '@angular/common';
import { BengaliNumberPipe } from "../../features/pipe/bengali-number.pipe";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
// import * as html2canvas from 'html2canvas';

import jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


@Component({
    selector: 'app-zakat-calculator',
    standalone: true,
    templateUrl: './zakat-calculator.component.html',
    styleUrl: './zakat-calculator.component.css',
    imports: [BanglaPipe, FormsModule, BengaliNumberPipe]
})
export class ZakatCalculatorComponent {
  datePipe: DatePipe = new DatePipe('en-US');
  forayez: any;
  forayezService = inject(ForayezService);
  model: any;
  totalGold: number = 0;
  totalSilver: number = 0;
  totalWealth: number = 0;
  totalZakat: number = 0;
  today: any;

  @ViewChild('MakePdf')
  MakePdf!: ElementRef;

  public captureScreen()  
  {  
    var data = document.getElementById('MakePdf');  //Id of the table
    html2canvas(data!).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 295;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });  
  }  
  

  constructor(){
    // Initialize model properties
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
  }
  
  ngOnInit(): void {
    this.forayezService.getForayez().subscribe(Response => {
      this.forayez = Response[0];
    })
    this.today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  onInputChange(event: any) {
    const {gold_22, gold_21, gold_18, gold_td, silver_22, silver_21, silver_18, silver_td, totalCashTk, totalPawnaTk, businessWealth, bankAccount, mobileBanking, debt} = this.model;
    const {gold_22k, gold_21k, gold_18k, gold_traditional, silver_22k, silver_21k, silver_18k, silver_traditional} = this.forayez;
    this.totalGold = (gold_22 * gold_22k * 0.8) + (gold_21 * gold_21k * 0.8) + (gold_18 * gold_18k * 0.8) + (gold_td * gold_traditional * 0.8);
    this.totalSilver = (silver_22 * silver_22k * 0.8) + (silver_21 * silver_21k * 0.8) + (silver_18 * silver_18k * 0.8) + (silver_td * silver_traditional * 0.8);
    this.totalWealth = (this.totalGold + this.totalSilver + totalCashTk + totalPawnaTk + businessWealth + bankAccount + mobileBanking) - debt;
    this.totalZakat = this.totalWealth / 40;
  }

  generatePDF() {
    const invoice = document.getElementById("MakePdf");
    console.log(invoice);
    console.log(this.MakePdf)
    const opt = {
      margin: 1,
      filename: 'MyZakad.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(invoice).set(opt).save("myPDF");
  }


  onReset(){
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
    this.totalGold = 0,
    this.totalSilver = 0,
    this.totalWealth = 0,
    this.totalZakat = 0
  }

}
