import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BengaliCalendarService } from '../../features/services/bengali-calendar.service';
import { SunsetService } from '../../features/services/sunset.service';
import moment from 'moment';
import 'moment/locale/ar'; // Import Arabic locale for Hijri dates
import 'moment/locale/en-gb'; // Import English locale for Gregorian dates
import 'moment-hijri'; // Hijri calendar support for moment.js
import 'moment-timezone';
import { toGregorian, toHijri } from 'hijri-converter';
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BengaliDatePipe } from "../../features/pipe/bengali-date.pipe";
import { BanglaPipe } from "../../features/pipe/bangla.pipe";
import { BengaliNumberPipe } from "../../features/pipe/bengali-number.pipe";
import { HijriDateAdjService } from '../../features/services/hijri-date-adj.service';

@Component({
  selector: 'app-hijri-date',
  standalone: true,
  templateUrl: './hijri-date.component.html',
  styleUrl: './hijri-date.component.css',
  imports: [CommonModule, FormsModule, BengaliDatePipe, BanglaPipe, BengaliNumberPipe]
})
export class HijriDateComponent {
  dateAdj: any;
  HijriDateAdjService = inject(HijriDateAdjService);
  isSunset$!: Observable<boolean>;
  currentDate: Date = new Date();
  datePipe: DatePipe = new DatePipe('en-US');
  selectedDate!: any;
  hijri!: string;
  hijri2!: string;
  hijri3!: any;
  dateEn: any;
  dateBd: any;
  notice: any = "";
  controlDay: any = 0;
  controlMonth: number = 0;
  ayameBijCalculate: any;
  hijriMonth!: any;
  englishMonth!: any;
  englishDay!: any;
  aiyameBiz: any = [];
  isTrue: boolean = true;
  monthName = ["","মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শওয়াল", "জ্বিলকদ", "জ্বিলহজ্জ"];
  EngMonthName = ['','জানুয়ারি', "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

  constructor(private bengaliCalendarService: BengaliCalendarService, private sunsetService: SunsetService) { }

  ngOnInit(): void {
    this.HijriDateAdjService.getHijriDate().subscribe(Response => {
      this.dateAdj = Response;
      this.controlDay = this.dateAdj.dateAdj;
      this.notice = this.dateAdj.note1Date;
      this.onDateSelected()
    })
    initTE({ Datepicker, Input },
      { allowReinits: true });
    this.selectedDate = this.datePipe.transform(this.currentDate, 'yyyy/MM/dd');
    this.onDateSelected()
  }

  onDateSelected(): void {
    this.hijri3 = null;
    const dateObject = new Date(this.selectedDate);
    // this.convertToBanglaDate(dateObject);
    this.setDatetimeHtml(dateObject);
    // Convert the selected date to Hijri using hijri-converter
    const nextDate = new Date(dateObject);
    // Add one day
    nextDate.setDate(nextDate.getDate() + this.controlDay);
    this.convertToHijri(nextDate);
  }



  // Bangla calender------------------------------------------------------------------------------------------------------------------------------------

  getDatebd(arg: any): any {
    const esheAdd = { e: ' ই', she: ' শে' }
    const kalAdd = ' কাল';
    const abodo = ' বঙ্গাব্দ';
    const monthName = [
      'বৈশাখ',
      'জ্যৈষ্ঠ',
      'আষাঢ়',
      'শ্রাবণ',
      'ভাদ্র',
      'আশ্বিন',
      'কার্তিক',
      'অগ্রহায়ণ',
      'পৌষ',
      'মাঘ',
      'ফাল্গুন',
      'চৈত্র'
    ];
    const dayName = [
      'বৃহস্পতিবার',
      'শুক্রবার',
      'শনিবার',
      'রবিবার',
      'সোমবার',
      'মঙ্গলবার',
      'বুধবার',
    ];
    const session = [
      'গ্রীষ্ম',
      'বর্ষা',
      'শরৎ',
      'হেমন্ত',
      'শীত',
      'বসন্ত',
    ];
    const numBd = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

    const convertNumber = (n: any) => n.toString().split("").map((num: any) => numBd[num]).join('');

    const addEe = (n: any) => {
      let x, y;
      x = n >= 10 && n < 20 ? esheAdd.e : '';
      y = n >= 20 && n <= 31 ? esheAdd.she : '';
      return x || y ? y + x : '';
    }

    const getYear = (dmy: any) => dmy.month <= 4 && dmy.date <= 13 ? dmy.year - 594 : dmy.year - 593;

    const getMonthDate = (d: any, m: any) => {
      switch (true) {
        case m == 1 && d <= 13:
          m = 8; d = d + 17;
          break;
        case m == 1 && d > 13:
          m = 9; d = d - 13;
          break;
        case m == 2 && d <= 12:
          m = 9; d = d + 18;
          break;
        case m == 2 && d > 12:
          m = 10; d = d - 12;
          break;
        case m == 3 && d <= 14:
          m = 10; d = d + 16;
          break;
        case m == 3 && d > 14:
          m = 11; d = d - 14;
          break;
        case m == 4 && d <= 13:
          m = 11; d = d + 17;
          break;
        case m == 4 && d > 13:
          m = 0; d = d - 13;
          break;
        case m == 5 && d <= 14:
          m = 0; d = d + 17;
          break;
        case m == 5 && d > 14:
          m = 1; d = d - 14;
          break;
        case m == 6 && d <= 14:
          m = 1; d = d + 17;
          break;
        case m == 6 && d > 14:
          m = 2; d = d - 14;
          break;
        case m == 7 && d <= 15:
          m = 2; d = d + 16;
          break;
        case m == 7 && d > 15:
          m = 3; d = d - 15;
          break;
        case m == 8 && d <= 15:
          m = 3; d = d + 16;
          break;
        case m == 8 && d > 15:
          m = 4; d = d - 15;
          break;
        case m == 9 && d <= 15:
          m = 4; d = d + 16;
          break;
        case m == 9 && d > 15:
          m = 5; d = d - 15;
          break;
        case m == 10 && d <= 15:
          m = 5; d = d + 15;
          break;
        case m == 10 && d > 15:
          m = 6; d = d - 15;
          break;
        case m == 11 && d <= 14:
          m = 6; d = d + 16;
          break;
        case m == 11 && d > 14:
          m = 7; d = d - 14;
          break;
        case m == 12 && d <= 14:
          m = 7; d = d + 16;
          break;
        case m == 12 && d > 14:
          m = 8; d = d - 14;
          break;
        default:
          m = false;
          d = false;
      }
      return { month: m, date: d };
    }

    var GetdayName = dayName[new Date(arg.year, arg.month, arg.date).getDay()];
    let daymon = getMonthDate(arg.date, arg.month);
    let getSession = session[Math.floor(daymon.month / 2)];

    return {
      day: GetdayName,
      date: convertNumber(daymon.date) + addEe(daymon.date),
      month: monthName[daymon.month],
      session: getSession + kalAdd,
      year: convertNumber(getYear(arg)) + abodo,
    };
  }

  setDateEng(tarik: Date): any {
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const arg = {
      date: tarik.getDate(),
      month: tarik.getMonth() + 1,
      year: tarik.getFullYear(),
    }

    const dateEn = {
      day: dayName[tarik.getDay()],
      date: arg.date,
      month: monthName[arg.month - 1],
      year: arg.year
    }

    const dateBd = this.getDatebd(arg);
    return { dateEn, dateBd }
  }

  setDatetimeHtml(dateVal: any): void {
    const { dateEn, dateBd } = this.setDateEng(new Date(dateVal));
    this.dateEn = dateEn;
    this.dateBd = dateBd;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------

  getBangladeshTime(gregorianDate: Date): any {
    // Set the time zone to Bangladesh time
    const bangladeshTimeZone = 'Asia/Dhaka';
    const dateInBangladeshTime = moment(gregorianDate).tz(bangladeshTimeZone);

    // Extract year, month, and day from the Gregorian date
    const year = dateInBangladeshTime.year();
    const month = dateInBangladeshTime.month();
    const day = dateInBangladeshTime.date();
    // const bangladeshTime = new Date(year, month, day);
    return { year, month, day };
  }

  getActualDateAfterSunSet(gregorianDate: Date): any {
    const { year, month, day } = this.getBangladeshTime(gregorianDate);
    const ddd = `${year}/${month + 1}/${day}`;
    this.isSunset$ = this.sunsetService.isSunset(ddd);
    this.isSunset$.subscribe(value => {
      if (value) {
        // Create a Date object for the given date
        const nextDate = new Date(gregorianDate);
        // Add one day
        nextDate.setDate(nextDate.getDate() + 1);
        const { year, month, day } = this.getBangladeshTime(nextDate);
        const hd = this.getCurrentHijriDate(`${year}/${month}/${day}`);
        this.hijri3 = this.getHijriTimeFormat(hd);
      }
    })
  }

   // Set Hijri Date Format
  getHijriTimeFormat(hd: any): any {
    const monthName = ["","মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শওয়াল", "জ্বিলকদ", "জ্বিলহজ্জ"];
    const hijriDate = hd[1];
    const hijriMonth = hd[0];
    const hijriYear = hd[2];
    return `${hijriDate}, ${monthName[hijriMonth]}, ${hijriYear} হিঃ`;
  }

  private convertToHijri(gregorianDate: Date): void {
    const { year, month, day } = this.getBangladeshTime(gregorianDate);

    // Use hijri-converter to convert the updated date to Hijri
    const hijriObject = this.getCurrentHijriDate(`${year}/${month}/${day}`);

    // calculate aiyame biz
    this.calculateAiyameBiz(hijriObject, gregorianDate);

    // Process to Date Format
    this.hijri2 = this.getHijriTimeFormat(hijriObject);
    this.getActualDateAfterSunSet(gregorianDate);
  }

  calculateAiyameBiz(hijriObject: any, englishDate: Date): void {
    const month = hijriObject[0];
    const arabicDay13 = toGregorian(hijriObject[2], month, 13 - this.controlDay);
    const arabicDay14 = toGregorian(hijriObject[2], month, 14 - this.controlDay);
    const arabicDay15 = toGregorian(hijriObject[2], month, 15 - this.controlDay);
    const d1 = new Date(`${arabicDay13.gy}/${arabicDay13.gm}/${arabicDay13.gd}`)
    const d2 = new Date(`${arabicDay14.gy}/${arabicDay14.gm}/${arabicDay14.gd}`)
    const d3 = new Date(`${arabicDay15.gy}/${arabicDay15.gm}/${arabicDay15.gd}`)

    this.englishDay = [this.setDateEng(d1), this.setDateEng(d2), this.setDateEng(d3)]

    this.aiyameBiz = [arabicDay13.gd.toFixed(), arabicDay14.gd.toFixed(), arabicDay15.gd.toFixed()];

    this.englishMonth = arabicDay13.gm;

    // if (todayArabic.gd >= day0.gd && todayArabic.gd < day4.gd) {
    //   this.isTrue = true;
    // } else {
    //   this.isTrue = true;
    // }

    this.hijriMonth = this.monthName[month];
  }

  getCurrentHijriDate(date: string) {
    const dateSplit = date.split('/');
    const newDate = `${dateSplit[0]}/${+dateSplit[1]+1}/${dateSplit[2]}`;
    const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(new Date(newDate));

    return hijriDate.replace(" AH", "").split("/").map(d => +d);
  }


}
