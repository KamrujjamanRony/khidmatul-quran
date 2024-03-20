import { Component } from '@angular/core';
import { LocationModel } from '../../features/model/method.model';
import { PrayTimesService } from '../../features/services/pray-times.service';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollComponent } from "../../components/scroll/scroll.component";
import { BengaliNumberPipe } from "../../features/pipe/bengali-number.pipe";

@Component({
    selector: 'app-salat-times',
    standalone: true,
    templateUrl: './salat-times.component.html',
    styleUrl: './salat-times.component.css',
    imports: [CommonModule, FormsModule, ScrollComponent, BengaliNumberPipe]
})
export class SalatTimesComponent {
  model: LocationModel = {
    latitude: 23,
    longitude: 93,
  };
  timezone: number = 6;
  dst: string = 'auto';
  method: string = 'Karachi';
  timeFormat: number = 12;
  tableTitle: string = '';
  currentDate: Date = new Date();
  timetableData: any[] = [];
  errorText: string | undefined = undefined;
  locationName: any = null;

  constructor(private prayTimes: PrayTimesService) {
    this.update();
  }
  ngOnInit(): void {
    this.getPreciseLocation();
    console.log(this.model.latitude, this.model.longitude)
  }

  onInputFocus(): void {
    this.update();
  }

  onFormSubmit(): void {
    this.update();
    this.getLocationName(this.model.latitude, this.model.longitude)
  }

  displayMonth(offset: number) {
    this.prayTimes.setMethod();
    this.currentDate.setMonth(this.currentDate.getMonth() + offset);
    const month = this.currentDate.getMonth();
    const year = this.currentDate.getFullYear();
    const title = this.monthFullName(month) + " " + year;
    this.tableTitle = title;
    this.makeTable(year, month);
  }

  isToday(day: any): boolean {
    const today = new Date();
    const todaySalatTime = day

    console.log(day)
    return day && day.day == today.getDate() && today.getMonth() === this.currentDate.getMonth();
  }

  makeTable(year: number, month: number) {
    this.timetableData = [];

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
      times['day'] = startDate.getDate().toFixed();
      this.timetableData.push(times); // Push the day's data into the timetableData array
      console.log(this.timetableData)

      startDate.setDate(startDate.getDate() + 1); // next day
    }
  }

  switchFormat(offset: number) {
    const formats = ["24-hour", "12-hour"];
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
    const x = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          console.log(position);
          x.showExactPosition(position);
        },
        (error) => {
          this.errorText = 'Geolocation error: ' + error.message;
        }
      );
    } else {
      this.errorText = 'Geolocation is not supported';
    }
  }

  showExactPosition(position: GeolocationPosition) {
    this.model.latitude = position.coords.latitude;
    this.model.longitude = position.coords.longitude;
    this.update();
    this.getLocationName(this.model.latitude, this.model.longitude);
  }

  getLocationName(latitude: any, longitude: any) {
    const nominatimURL = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    axios
      .get(nominatimURL)
      .then((response) => {
        console.log(response)
        if (response.data.display_name) {
          this.locationName = response.data;
        } else {
          this.locationName = 'Location not found';
        }
      })
      .catch((error) => {
        this.locationName = 'Error fetching location: ' + error.message;
      });
  }

}
