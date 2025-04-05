import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DateUtilService {
    hijri13!: Date;
    hijri14!: Date;
    hijri15!: Date;

    getGregorianDate(): string {
        const today = new Date();
        return today.toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + ' খ্রিস্টাব্দ';
    }

    getHijriDate(dayAdj: number): string {
        const today: any = new Date();
        today.setDate(today.getDate() + dayAdj);
        const firstDay: any = new Date();
        const hijriDate = this.gregorianToHijri(today);
        // console.log(hijriDate)
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

    getHijriNextDay(dayAdj: number): string {
        const today = new Date();
        today.setDate(today.getDate() + 1 + dayAdj); // Add 1 day
        const hijriDate = this.gregorianToHijri(today);
        return `${hijriDate.day}, ${hijriDate.month}, ${hijriDate.year} হিঃ`;
    }

    private gregorianToHijri(date: Date) {
        const gd = date.getDate();
        const gm = date.getMonth() + 1;
        const gy = date.getFullYear();

        let jd = this.gregorianToJulianDay(gy, gm, gd);

        // Calculate Hijri date from Julian day
        jd = Math.floor(jd);
        let l = jd - 1948440 + 10632;
        let n = Math.floor((l - 1) / 10631);
        l = l - 10631 * n + 354;
        let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
        l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;

        let m = Math.floor((24 * l) / 709);
        let d = l - Math.floor((709 * m) / 24);
        let y = 30 * n + j - 30;

        return {
            year: y,
            month: this.getHijriMonth(m - 1),
            monthIndex: m - 1,
            day: d
        };
    }

    private gregorianToJulianDay(gy: number, gm: number, gd: number) {
        let jd = (1461 * (gy + 4800 + Math.floor((gm - 14) / 12))) / 4;
        jd += (367 * (gm - 2 - 12 * Math.floor((gm - 14) / 12))) / 12;
        jd -= (3 * Math.floor((gy + 4900 + Math.floor((gm - 14) / 12)) / 100)) / 4;
        jd += gd - 32075;
        return jd;
    }

    private getHijriMonth(index: number): string {
        const months = ['মুহাররম', 'সফর', 'রবিউল আউয়াল', 'রবিউস সানি', 'জমাদিউল আউয়াল', 'জমাদিউস সানি', 'রজব', 'শাবান', 'রমজান', 'শাওয়াল', 'জিলকদ', 'জিলহজ'];
        return months[index] || 'রমজান';
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
