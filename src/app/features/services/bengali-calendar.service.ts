import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BengaliCalendarService {

  convertToBanglaDate(gregorianDate: Date): any {
    const esheAdd = { e: ' ই', she: ' শে' };
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
      'চৈত্র',
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
    };

    const getYear = (dmy: any) => dmy.month <= 4 && dmy.date <= 13 ? dmy.year - 594 : dmy.year - 593;

    const getMonthDate = (d: any, m: any) => {
      switch (m) {
        case 1:
          return d <= 13 ? { month: 8, date: d + 17 } : { month: 9, date: d - 13 };
        case 2:
          return d <= 12 ? { month: 9, date: d + 18 } : { month: 10, date: d - 12 };
        case 3:
          return d <= 14 ? { month: 10, date: d + 16 } : { month: 11, date: d - 14 };
        case 4:
          return d <= 13 ? { month: 11, date: d + 17 } : { month: 0, date: d - 13 };
        case 5:
          return d <= 14 ? { month: 0, date: d + 17 } : { month: 1, date: d - 14 };
        case 6:
          return d <= 14 ? { month: 1, date: d + 17 } : { month: 2, date: d - 14 };
        case 7:
          return d <= 15 ? { month: 2, date: d + 16 } : { month: 3, date: d - 15 };
        case 8:
          return d <= 15 ? { month: 3, date: d + 16 } : { month: 4, date: d - 15 };
        case 9:
          return d <= 15 ? { month: 4, date: d + 16 } : { month: 5, date: d - 15 };
        case 10:
          return d <= 15 ? { month: 5, date: d + 15 } : { month: 6, date: d - 15 };
        case 11:
          return d <= 14 ? { month: 6, date: d + 16 } : { month: 7, date: d - 14 };
        case 12:
          return d <= 14 ? { month: 7, date: d + 16 } : { month: 8, date: d - 14 };
        default:
          return { month: 0, date: 0 };
      }
    };

    const GetdayName = dayName[new Date(gregorianDate.getFullYear(), gregorianDate.getMonth(), gregorianDate.getDate()).getDay()];
    let daymon = getMonthDate(gregorianDate.getDate(), gregorianDate.getMonth() + 1);
    let getSession = session[Math.floor(daymon.month / 2)];

    return {
      day: GetdayName,
      date: convertNumber(daymon.date) + addEe(daymon.date),
      month: monthName[daymon.month - 1],
      session: getSession + kalAdd,
      year: convertNumber(getYear({
        date: gregorianDate.getDate(),
        month: gregorianDate.getMonth() + 1,
        year: gregorianDate.getFullYear(),
      })) + abodo,
    };
  }
}
