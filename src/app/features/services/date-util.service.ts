import { inject, Injectable } from '@angular/core';
import { JsonDataService } from './json-data.service';

@Injectable({
    providedIn: 'root'
})
export class DateUtilService {
    dataService = inject(JsonDataService);
    hijri13!: Date;
    hijri14!: Date;
    hijri15!: Date;
    jsonData = new JsonDataService;
    dateAdj!: any;

    // constructor() {
    //     this.getDateAdjData();
    // }

    // getDateAdjData() {
    //     this.dataService.getHijriDateAdjData().subscribe(data => {
    //         this.dateAdj = data?.dateAdj | 0;
    //         this.getHijriDate()
    //         console.log(data)
    //     })
    // }

    getGregorianDate(): string {
        console.log(this.jsonData)
        const today = new Date();
        return today.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' খ্রিস্টাব্দ';
    }

    getHijriDate(): string {
        console.log(this.jsonData)
        const today: any = new Date();
        today.setDate(today.getDate() + 0);
        console.log(this.dateAdj)
        const firstDay: any = new Date();
        const hijriDate = this.gregorianToHijri(today);
        firstDay.setDate(firstDay.getDate() - hijriDate.day + 13);
        this.hijri13 = firstDay.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // console.log("hijri 13th day: " + this.hijri13);
        firstDay.setDate(firstDay.getDate() + 1);
        this.hijri14 = firstDay.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // console.log("hijri 14th day: " + this.hijri14);
        firstDay.setDate(firstDay.getDate() + 1);
        this.hijri15 = firstDay.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        // console.log("hijri 15th day: " + this.hijri15);
        return `${hijriDate.day}, ${hijriDate.month}, ${hijriDate.year} হিঃ`;
    }

    getHijriNextDay(): string {
        const today = new Date();
        today.setDate(today.getDate() + 1); // Add 1 day
        const hijriDate = this.gregorianToHijri(today);
        return `${hijriDate.day}, ${hijriDate.month}, ${hijriDate.year} হিঃ`;
    }

    private gregorianToHijri(date: Date) {
        const hijriStart = new Date(622, 6, 16);
        const diff = date.getTime() - hijriStart.getTime();
        const oneHijriYear = 354.367 * 24 * 60 * 60 * 1000;
        const hijriYear = 1 + Math.floor(diff / oneHijriYear);
        const hijriDay = 1 + Math.floor((diff % oneHijriYear) / (24 * 60 * 60 * 1000));
        const hijriMonthIndex = Math.floor(hijriDay / 29.5) + 1;
        return { year: hijriYear, month: this.getHijriMonth(hijriMonthIndex), monthIndex: hijriMonthIndex, day: hijriDay % 30 };
    }

    private getHijriMonth(index: number): string {
        const months = ['মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান', 'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'];
        return months[index - 1] || 'রমজান';
    }


    private getBanglaMonth(index: number): string {
        const months = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
        return months[index - 1] || 'চৈত্র';
    }

    // Function to convert Gregorian to Bangla (Simple Approximation)
    private gregorianToBangla(date: Date) {
        const banglaStart = new Date(593, 3, 14); // Bengali calendar starts in 593 AD
        const diff = date.getTime() - banglaStart.getTime();
        const oneBanglaYear = 365.25 * 24 * 60 * 60 * 1000; // Bengali year length
        const banglaYear = 1 + Math.floor(diff / oneBanglaYear);
        const banglaDay = 1 + Math.floor((diff % oneBanglaYear) / (24 * 60 * 60 * 1000));
        const banglaMonth = Math.floor(banglaDay / 30) + 1;
        return { year: banglaYear, month: this.getBanglaMonth(banglaMonth), day: banglaDay % 30 };
    }

    // Convert Gregorian to Bangla date
    getBanglaDate(): string {
        const today = new Date();
        const banglaDate = this.gregorianToBangla(today);
        return `${banglaDate.day}, ${banglaDate.month}, ${banglaDate.year} বঙ্গাব্দ`;
    }
}
