import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SunsetService {
  private latitude: any;
  private longitude: any;
  // private readonly BDT_OFFSET = 6 * 60;

  constructor(private http: HttpClient) {
    this.getCurrentLocation().then(
      (position: any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      (error: any) => {
        console.error('Error getting location:', error.message);
      }
    );
  }

  OnInit(): void {
    this.getCurrentLocation().then(
      (position: any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      },
      (error: any) => {
        console.error('Error getting location:', error.message);
      }
    );
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => resolve(position),
          (error: any) => reject(error)
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  getSunsetTime(ddd: any): Observable<any> {
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${ddd}&formatted=0`;
    return this.http.get(apiUrl);
  }

  isSunset(ddd: any): Observable<boolean> {
    return this.getSunsetTime(ddd).pipe(
      map((response: any) => {
        const sunsetTimeUTC = new Date(response.results.sunset);
        
        // Convert UTC time to BDT
        const sunsetTimeBDT = new Date(sunsetTimeUTC.getTime());  //  + (this.BDT_OFFSET * 60000)

        const currentTimeBDT = new Date();
        console.log(sunsetTimeBDT);
        console.log(currentTimeBDT);

        // Check if the current time is after sunset in BDT
        return currentTimeBDT > sunsetTimeBDT;
      })
    );
  }
}