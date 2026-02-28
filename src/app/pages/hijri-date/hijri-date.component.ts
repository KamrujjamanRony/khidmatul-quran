import { Component, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { SunsetService } from '../../features/services/sunset.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HijriDateAdjService } from '../../features/services/hijri-date-adj.service';
import { LoaderComponent } from "../../components/loader/loader.component";
import { DateUtilService } from '../../features/services/date-util.service';
import { BanglaPipe } from "../../features/pipe/bangla.pipe";
import { JsonDataService } from '../../features/services/json-data.service';

@Component({
  selector: 'app-hijri-date',
  templateUrl: './hijri-date.component.html',
  styleUrl: './hijri-date.component.css',
  imports: [CommonModule, FormsModule, LoaderComponent, BanglaPipe]
})
export class HijriDateComponent {
  // HijriDateAdjService = inject(HijriDateAdjService);
  dataService = inject(JsonDataService);
  dateUtil = inject(DateUtilService);
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
  today: any;
  isSunset = signal(false);
  isLoading = signal(false);

  model: any = {
    latitude: 23.75,  // Default latitude (Dhaka, Bangladesh)
    longitude: 90.383333, // Default longitude (Dhaka, Bangladesh)
  };
  hijriMonthFirstDay: any = '';

  constructor() { }

  ngOnInit(): void {
    this.isLoading.set(true);
    this.getIsSunset();
    // this.HijriDateAdjService.getHijriDate().subscribe(data => {
    //   this.gregorianDate = data?.gregorianDate;
    //   this.banglaDate = data?.banglaDate;
    //   this.hijriDate = data?.hijriDate;
    //   this.hijriNextDay = data?.hijriNextDay;
    //   this.arabic13 = [`${data?.arabic13[2]} ${data?.arabic13[1]}`, data?.arabic13[3]];
    //   this.arabic14 = [`${data?.arabic14[2]} ${data?.arabic14[1]}`, data?.arabic14[3]];
    //   this.arabic15 = [`${data?.arabic15[2]} ${data?.arabic15[1]}`, data?.arabic15[3]];
    //   this.hijriMonth = this.hijriNextDay?.split(', ')[1];
    //   this.gregorianMonth = data?.arabic13[1];
    //   this.isLoading.set(false);
    // })



    this.dataService.getHijriDateAdjData().subscribe(data => {
      const dateAdj = data?.dateAdj | 0;
      this.gregorianDate = this.dateUtil.getGregorianDate();
      this.hijriDate = this.dateUtil.getHijriDate(dateAdj);
      this.hijriDate && this.isLoading.set(false);
      this.hijriNextDay = this.dateUtil.getHijriNextDay(dateAdj);
      this.banglaDate = this.dateUtil.getBanglaDate();
      this.arabic13 = this.dateUtil.hijri13;
      this.arabic14 = this.dateUtil.hijri14;
      this.arabic15 = this.dateUtil.hijri15;
    })



    this.today = new Date();
  }

  getIsSunset() {
    // Get Precise Location
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.model.latitude = position.coords.latitude;
        this.model.longitude = position.coords.longitude;
        // Get sunset date from API
        const today = new Date();
        const ddd = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
        this.isSunset$ = this.sunsetService.isSunset(ddd, this.model);
        this.isSunset$.subscribe(value => {
          this.isSunset.set(value);
        })
      },
      (error) => {
        console.error('Geolocation error:', error);
        let message = 'An unknown error occurred.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'User denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            message = 'The request to get user location timed out.';
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }


}
