import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BengaliCalendarService } from '../../features/services/bengali-calendar.service';
import { SunsetService } from '../../features/services/sunset.service';
import moment from 'moment';
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

@Component({
  selector: 'app-hijri-date',
  standalone: true,
  templateUrl: './hijri-date.component.html',
  styleUrl: './hijri-date.component.css',
  imports: [CommonModule, FormsModule, BengaliDatePipe, BanglaPipe, BengaliNumberPipe]
})
export class HijriDateComponent {
  isSunset$!: Observable<boolean>;
  currentDate: Date = new Date();
  datePipe: DatePipe = new DatePipe('en-US');
  selectedDate!: any;
  hijri!: string;
  hijri2!: string;
  hijri3!: any;
  dateEn: any;
  dateBd: any;
  controlDay: number = -1;
  controlMonth: number = 0;
  hijriMonth!: any;
  englishMonth!: any;
  englishDay!: any;
  aiyameBiz: any = [];
  isTrue: boolean = true;
  monthName = ["মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শওয়াল", "জ্বিলকদ", "জ্বিলহজ্জ"];
  EngMonthName = ['জানুয়ারি', "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];

  constructor(private bengaliCalendarService: BengaliCalendarService, private sunsetService: SunsetService) { }

  ngOnInit(): void {
    initTE({ Datepicker, Input },
      { allowReinits: true });
    this.selectedDate = this.datePipe.transform(this.currentDate, 'yyyy/MM/dd');
    this.onDateSelected()
  }

  onDateSelected(): void {
    this.hijri3 = null;
    // Convert the selected date to Hijri using hijri-converter
    this.convertToHijri(this.selectedDate);
    const dateObject = new Date(this.selectedDate);
    this.setDatetimeHtml(dateObject);
    const hijriDate = this.getCurrentHijriDate(this.selectedDate);
    // this.convertToBanglaDate(dateObject);
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
        const { year, month, day } = this.getBangladeshTime(gregorianDate);
        const nextDay = day + 1;
        const ActualHijriObject = toHijri(year, month, nextDay);
        const monthName = ["মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি", "জমাদিউল আউয়াল", "জমাদিউস সানি", "রজব", "শাবান", "রমজান", "শওয়াল", "জ্বিলকদ", "জ্বিলহজ্জ"]
        const hijriDate = ActualHijriObject.hd;
        const hijriMonth = ActualHijriObject.hm;
        const hijriYear = ActualHijriObject.hy;
        this.hijri3 = `${hijriDate}, ${monthName[hijriMonth]}, ${hijriYear} হিঃ`;
        // if (hijriDate == 1) {
        //   this.hijri3 = `${hijriDate}st , ${monthName[hijriMonth]} , ${hijriYear}`;
        // } else if (hijriDate == 2) {
        //   this.hijri3 = `${hijriDate}nd , ${monthName[hijriMonth]} , ${hijriYear}`;
        // } else if (hijriDate == 3) {
        //   this.hijri3 = `${hijriDate}rd , ${monthName[hijriMonth]} , ${hijriYear}`;
        // } else {
        //   this.hijri3 = `${hijriDate}th , ${monthName[hijriMonth]} , ${hijriYear}`;
        // }
      }
    })
  }

  private convertToHijri(gregorianDate: Date): void {
    // Set the time zone to Bangladesh time
    const { year, month, day } = this.getBangladeshTime(gregorianDate);
    // ---------------------------------------------------------------------------------------------------------------------------------------------------
    const updatedDate = day + this.controlDay;
    // Use hijri-converter to convert the date to Hijri
    const hijriObject = toHijri(year, month, updatedDate);

    // calculate aiyame biz
    this.calculateAiyameBiz(hijriObject);

    // Process to Date Format
    this.hijriDateFormate(hijriObject);
    this.getActualDateAfterSunSet(gregorianDate)
  }

  calculateAiyameBiz(hijriObject: any): void {
    // aiyame biz
    const month = hijriObject.hm + this.controlMonth;
    // const day0 = toGregorian(hijriObject.hy, month, 1 - this.controlDay);
    const arabicDay13 = toGregorian(hijriObject.hy, month, 13 - this.controlDay);
    const arabicDay14 = toGregorian(hijriObject.hy, month, 14 - this.controlDay);
    const arabicDay15 = toGregorian(hijriObject.hy, month, 15 - this.controlDay);
    // const day4 = toGregorian(hijriObject.hy, month, 16 - this.controlDay);
    // const todayArabic = toGregorian(hijriObject.hy, month, hijriObject.hd - this.controlDay);
    const d1 = new Date(`${arabicDay13.gy}/${arabicDay13.gm + 1}/${arabicDay13.gd}`)
    const d2 = new Date(`${arabicDay14.gy}/${arabicDay14.gm + 1}/${arabicDay14.gd}`)
    const d3 = new Date(`${arabicDay15.gy}/${arabicDay15.gm + 1}/${arabicDay15.gd}`)

    this.englishDay = [this.setDateEng(d1), this.setDateEng(d2), this.setDateEng(d3)]

    this.aiyameBiz = [arabicDay13.gd.toFixed(), arabicDay14.gd.toFixed(), arabicDay15.gd.toFixed()];

    this.englishMonth = arabicDay13.gm;
    // console.log(hijriObject);
    // console.log(arabicDay13);

    // if (todayArabic.gd >= day0.gd && todayArabic.gd < day4.gd) {
    //   this.isTrue = true;
    // } else {
    //   this.isTrue = true;
    // }

    this.hijriMonth = this.monthName[month];
  }


  // Set Hijri Date Format
  private hijriDateFormate(hijriObject: any): void {
    const hijriDate = hijriObject.hd;
    const hijriMonth = hijriObject.hm;
    const hijriYear = hijriObject.hy;

    this.hijri = `${hijriDate} / ${hijriMonth + 1} / ${hijriYear}`;
    this.hijri2 = `${hijriDate}, ${this.monthName[hijriMonth]}, ${hijriYear} হিজরি`;
  }


  getCurrentHijriDate(date: string) {
    const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    }).format(new Date(date));

    return hijriDate.replace(" AH", "").split("/").map(d => +d);
  }

  hijriToGregorian(hijriYear: number, hijriMonth: number, hijriDay: number | undefined) {
    // Create a Hijri date object
    const hijriDate = new Intl.DateTimeFormat('islamic-u-ca-en-US', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    }).format(new Date(hijriYear, hijriMonth - 1, hijriDay));

    // Parse the formatted date to extract Gregorian components
    const [gregorianMonth, gregorianDay, gregorianYear] = hijriDate.replace(" AH", "").split('/').map(Number);
    console.log({ year: gregorianYear, month: gregorianMonth, day: gregorianDay })

    return { year: gregorianYear, month: gregorianMonth, day: gregorianDay };
}

// Example usage:
hijriDate = { year: 1443, month: 7, day: 16 }; // Hijri date: 16th day of the 7th month of the year 1443 AH
gregorianDate = this.hijriToGregorian(this.hijriDate.year, this.hijriDate.month, this.hijriDate.day);

}
