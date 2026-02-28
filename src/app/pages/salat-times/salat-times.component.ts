import { Component, inject, signal } from '@angular/core';
import { PrayTimesService } from '../../features/services/pray-times.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollComponent } from "../../components/scroll/scroll.component";
import { BengaliNumberPipe } from "../../features/pipe/bengali-number.pipe";
import { ToastService } from '../../components/primeng/toast/toast.service';
import { SharedSalatTimeService } from '../../features/services/shared-salat-time.service';
import { BanglaPipe } from "../../features/pipe/bangla.pipe";
import { b } from '@angular/core/navigation_types.d-u4EOrrdZ';

@Component({
  selector: 'app-salat-times',
  templateUrl: './salat-times.component.html',
  styleUrl: './salat-times.component.css',
  imports: [CommonModule, FormsModule, ScrollComponent, BengaliNumberPipe, BanglaPipe]
})
export class SalatTimesComponent {
  private toastService = inject(ToastService);
  private prayTimes = inject(PrayTimesService);
  private sharedSalatTimeService = inject(SharedSalatTimeService);

  model: any = {
    latitude: 23.75,
    longitude: 90.383333,
  };

  timezone: number = 6;
  dst: string = 'auto';
  method: string = 'Karachi';
  timeFormat: number = 12;

  tableTitle = signal<any>(null);
  currentDate: Date = new Date();
  timetableData = signal<any[]>([]);
  locationName = signal<any>(null);
  errorText = signal<any>(null);
  showLocation = signal<boolean>(false);
  today = new Date();
  todaySalatTime: any;
  isShow: boolean = true;

  constructor() {
    const savedLocation = localStorage.getItem('salatLocation');
    if (savedLocation) {
      const parsed = JSON.parse(savedLocation);
      this.model.latitude = parsed.latitude;
      this.model.longitude = parsed.longitude;
      if (parsed.locationName) {
        this.locationName.set(parsed.locationName);
      }
    } else {
      this.getPreciseLocation();
    }
    this.update();
  }

  ngOnInit(): void {
    const savedLocation = localStorage.getItem('salatLocation');
    if (savedLocation) {
      const parsed = JSON.parse(savedLocation);
      this.model.latitude = parsed.latitude;
      this.model.longitude = parsed.longitude;
      if (parsed.locationName) {
        this.locationName.set(parsed.locationName);
      }
    } else {
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        this.toastService.showMessage('warn', 'Warning', 'Location services require HTTPS.');
        return;
      }
      this.getPreciseLocation();
    }
    this.update();
  }

  onInputFocus(): void {
    this.update();
  }

  onFormSubmit(): void {
    this.update();
    this.saveLocation();
    this.getLocationName(this.model.latitude, this.model.longitude);
  }

  displayMonth(offset: number) {
    this.prayTimes.setMethod();
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const title = this.monthFullName(month) + " " + year;
    this.tableTitle.set(title);
    this.makeTable(year, month);
    this.todaySalatTime = this.timetableData()[this.today.getDate() - 1];
    this.sharedSalatTimeService.setTodaySalatTime(this.todaySalatTime);
  }

  isToday(day: any): boolean {
    return day && day.day == this.today.getDate() && this.today.getMonth() === this.currentDate.getMonth();
  }

  makeTable(year: number, month: number) {
    this.timetableData.set([]);
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);
    const format = this.timeFormat ? "12hNS" : "24h";

    while (startDate < endDate) {
      const times = this.prayTimes.getTimes(
        startDate,
        [this.model.latitude || 0, this.model.longitude || 0],
        this.timezone,
        this.dst,
        format
      );
      times['day'] = startDate.getDate()?.toFixed();
      this.timetableData().push(times);
      startDate.setDate(startDate.getDate() + 1);
    }
  }

  switchFormat(offset: number) {
    this.timeFormat = (this.timeFormat + offset) % 2;
    this.update();
  }

  update() {
    this.displayMonth(0);
  }

  monthFullName(month: number) {
    const monthName = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return monthName[month];
  }

  getPreciseLocation() {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      this.toastService.showMessage('error', 'Error', 'Location access requires HTTPS.');
      return;
    }

    if (!navigator.geolocation) {
      this.errorText.set('Geolocation is not supported by this browser.');
      this.toastService.showMessage('error', 'Error', this.errorText());
      return;
    }

    this.toastService.showMessage('info', 'Info', 'Fetching location...');

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        this.errorText.set(null);
        this.showExactPosition(position);
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
        this.errorText.set(message);
        this.toastService.showMessage('error', 'Error', message);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  showExactPosition(position: GeolocationPosition) {
    this.model.latitude = position.coords.latitude;
    this.model.longitude = position.coords.longitude;
    this.update();
    this.getLocationName(this.model.latitude, this.model.longitude);
    this.saveLocation();
  }

  getLocationName(latitude: any, longitude: any) {
    const nominatimURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    axios
      .get(nominatimURL)
      .then((response) => {
        if (response.data.display_name) {
          this.locationName.set(response.data);
          this.saveLocation();
          this.toastService.showMessage('info', 'Success', 'লোকেশন আপডেড হয়েছে!');
        } else {
          this.toastService.showMessage('error', 'Error', 'Location not found');
        }
      })
      .catch((error) => {
        this.toastService.showMessage('error', 'Error', error.message);
      });
  }

  saveLocation(): void {
    const locationData = {
      latitude: this.model.latitude,
      longitude: this.model.longitude,
      locationName: this.locationName()
    };
    localStorage.setItem('salatLocation', JSON.stringify(locationData));
  }
}
