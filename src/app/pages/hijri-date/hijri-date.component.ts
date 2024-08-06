import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SunsetService } from '../../features/services/sunset.service';
import {
  Datepicker,
  Input,
  initTE,
} from "tw-elements";
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BengaliNumberPipe } from "../../features/pipe/bengali-number.pipe";
import { HijriDateAdjService } from '../../features/services/hijri-date-adj.service';

@Component({
  selector: 'app-hijri-date',
  standalone: true,
  templateUrl: './hijri-date.component.html',
  styleUrl: './hijri-date.component.css',
  imports: [CommonModule, FormsModule, BengaliNumberPipe]
})
export class HijriDateComponent {
  HijriDateAdjService = inject(HijriDateAdjService);
  sunsetService = inject(SunsetService);
  isSunset$!: Observable<boolean>;
  gregorianDate: any;
  banglaDate: any;
  hijriDate: any;
  hijriNextDay: any;
  arabic13: any;
  arabic14: any;
  arabic15: any;
  hijriMonth: any;
  gregorianMonth: any;
  isSunset: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.getActualDateAfterSunSet();
    this.HijriDateAdjService.getHijriDate().subscribe(data => {
      this.gregorianDate = data?.gregorianDate;
      this.banglaDate = data?.banglaDate;
      this.hijriDate = data?.hijriDate;
      this.hijriNextDay = data?.hijriNextDay;
      this.arabic13 = [`${data?.arabic13[2]} ${data?.arabic13[1]}`, data?.arabic13[3]];
      this.arabic14 = [`${data?.arabic14[2]} ${data?.arabic14[1]}`, data?.arabic14[3]];
      this.arabic15 = [`${data?.arabic15[2]} ${data?.arabic15[1]}`, data?.arabic15[3]];
      this.hijriMonth = this.hijriNextDay?.split(', ')[1];
      this.gregorianMonth = data?.arabic13[1];
    })
    initTE({ Datepicker, Input },
      { allowReinits: true });
  }

  getActualDateAfterSunSet(): any {
    const today = new Date();
    const ddd = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
    this.isSunset$ = this.sunsetService.isSunset(ddd);
    this.isSunset$.subscribe(value => {
      this.isSunset = value;
    })
  }


}
