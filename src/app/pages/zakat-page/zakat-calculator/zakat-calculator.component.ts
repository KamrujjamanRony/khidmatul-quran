import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { BanglaPipe } from '../../../features/pipe/bangla.pipe';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { BengaliNumberPipe } from "../../../features/pipe/bengali-number.pipe";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { ZakatService } from '../../../features/services/zakat.service';

@Component({
  selector: 'app-zakat-calculator',
  standalone: true,
  templateUrl: './zakat-calculator.component.html',
  styleUrl: './zakat-calculator.component.css',
  imports: [BanglaPipe, FormsModule, BengaliNumberPipe, CommonModule, BengaliDatePipe]
})
export class ZakatCalculatorComponent {
  datePipe: DatePipe = new DatePipe('en-US');
  forayez: any;
  ZakatService = inject(ZakatService);
  model: any;
  totalGold: number = 0;
  totalSilver: number = 0;
  today: any;
  asset: string = 'ভরি';


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
      businessWealth: null,
      bankAccount: null,
      mobileBanking: null,
      debt: null,
    };
  }

  ngOnInit(): void {
    this.ZakatService.getZakat().subscribe(Response => {
      this.forayez = Response;
    })
    this.today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

  onInputChange(event: any) {
    const { gold_22, gold_21, gold_18, gold_td, silver_22, silver_21, silver_18, silver_td } = this.model;
    const { gold22k, gold21k, gold18k, goldTd, silver22k, silver21k, silver18k, silverTd } = this.forayez;
    this.totalGold = (gold_22 * gold22k * 0.8) + (gold_21 * gold21k * 0.8) + (gold_18 * gold18k * 0.8) + (gold_td * goldTd * 0.8);
    this.totalSilver = (silver_22 * silver22k * 0.8) + (silver_21 * silver21k * 0.8) + (silver_18 * silver18k * 0.8) + (silver_td * silverTd * 0.8);
    // this.totalWealth = (this.totalGold + this.totalSilver + totalCashTk + totalPawnaTk + businessWealth + bankAccount + mobileBanking) - debt;
    // this.totalZakat = this.totalWealth / 40;
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

  //   generatePDF(): void {
  //     // Assuming `this.today` is a Date object
  //     const bengaliNumberPipe = new BengaliNumberPipe(); // Instantiate the pipe
  //     const formattedDate = bengaliNumberPipe.transform(this.today);

  //     // Load font file and generate PDF after font is loaded
  //     this.loadFontFile().then((fontData) => {
  //         const doc = new jsPDF({filters: ['ASCIIHexEncode']});


  //         // Add the font
  //         doc.addFileToVFS('kalpurushANSI.ttf', fontData);
  //         doc.addFont('kalpurushANSI.ttf', 'kalpurush', 'normal');
  //         // Set font
  //         doc.setFont('kalpurush', 'normal');
  //         doc.setFontSize(10);

  //         console.log(doc.getFontList());

  //         const rows = [
  //               ["যাকাত হিসাবের তারিখ", formattedDate],
  //               ["মোট জুয়েলারি মূল্যঃ", formattedDate],
  //               ["মোট ক্যাশ টাকাঃ", formattedDate],
  //               ["মোট পাওনা টাকাঃ", formattedDate],
  //               ["মোট ব্যবসায়িক সম্পদঃ", formattedDate],
  //               ["ব্যাংক অ্যাকাউন্টে জমাঃ", formattedDate],
  //               ["মোবাইল ব্যাংকিং এ জমাঃ", formattedDate],
  //               ["বিয়োগযোগ্য ঋণ ও দায়ঃ", formattedDate],
  //               ["যাকাতের হিসাবযোগ্য সম্পদের পরিমান = ০.০০ টাকা"],
  //               ["মোট যাকাত = ০.০০ টাকা"],
  //           ];



  //         // Add table
  //         (doc as any).autoTable({
  //             head: [],
  //             body: rows,
  //             startY: 20,
  //             theme: 'grid',
  //         });

  //         // Save the PDF
  //         doc.save('table.pdf');
  //     }).catch(error => {
  //         console.error('Error loading font file:', error);
  //     });
  // }

  //   // Function to load font file using HttpClient and convert it to base64
  //   private loadFontFile(): Promise<string> {
  //     const fontPath = 'assets/font/kalpurushANSI.ttf'; // Adjust the path to your font file
  //     return new Promise((resolve, reject) => {
  //         this.http.get(fontPath, { responseType: 'arraybuffer' }).subscribe(arrayBuffer => {
  //             const uint8Array = new Uint8Array(arrayBuffer);
  //             const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  //             const fontData = btoa(binaryString);
  //             resolve(fontData);
  //         }, error => {
  //             console.error('Error loading font file:', error);
  //             reject(error);
  //         });
  //     });
  // }



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
    this.totalGold = 0,
      this.totalSilver = 0
  }

}
