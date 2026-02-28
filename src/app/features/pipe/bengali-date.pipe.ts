import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bengaliDate',
  standalone: true
})
export class BengaliDatePipe implements PipeTransform {

  englishToBengaliMap: any = {
    'Sunday': 'রবিবার',
    'Monday': 'সোমবার',
    'Tuesday': 'মঙ্গলবার',
    'Wednesday': 'বুধবার',
    'Thursday': 'বৃহস্পতিবার',
    'Friday': 'শুক্রবার',
    'Saturday': 'শনিবার',
    'January': 'জানুয়ারি',
    'February': 'ফেব্রুয়ারি',
    'March': 'মার্চ',
    'April': 'এপ্রিল',
    'May': 'মে',
    'June': 'জুন',
    'July': 'জুলাই',
    'August': 'অগাস্ট',
    'September': 'সেপ্টেম্বর',
    'October': 'অক্টোবর',
    'November': 'নভেম্বর',
    'December': 'ডিসেম্বর'
  };

  transform(value: string): string {
    // console.log(value)
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let bengaliDate: string = value;

    // Replace English digits with Bengali digits
    for (let i = 0; i < englishDigits.length; i++) {
      const regex = new RegExp(englishDigits[i], 'g');
      bengaliDate = bengaliDate?.replace(regex, bengaliDigits[i]);
    }

    // Replace English words with Bengali equivalents
    for (const [english, bengali] of Object.entries(this.englishToBengaliMap)) {
      bengaliDate = bengaliDate?.replace(new RegExp(english, 'g'), bengali as string);
    }

    return bengaliDate;
  }


}
