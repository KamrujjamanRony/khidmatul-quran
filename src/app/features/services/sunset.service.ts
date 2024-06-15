import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SunsetService {
  private latitude: any;
  private longitude: any;
  private DEFAULT_LATITUDE: any = 23.75;
  private DEFAULT_LONGITUDE: any = 90.383333;

  constructor(private http: HttpClient) { }

  initialize(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getCurrentLocation().then(
        (position: any) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          resolve();
        },
        (error: any) => {
          console.error('Error getting location:', error.message);
          reject(error);
        }
      );
    });
  }

  getCurrentLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: any) => resolve(position),
          (error: any) => reject(error)
        );
      } else {
        // Handle case when geolocation is not supported by the browser
        const defaultLocation = { coords: { latitude: this.DEFAULT_LATITUDE, longitude: this.DEFAULT_LONGITUDE } };
        resolve(defaultLocation);
      }
    });
  }


  getSunsetTime(ddd: any): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      if (!this.latitude || !this.longitude) {
        const apiUrl = `https://api.sunrise-sunset.org/json?lat=${this.DEFAULT_LATITUDE}&lng=${this.DEFAULT_LONGITUDE}&date=${ddd}&formatted=0`;
        this.http.get(apiUrl).subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: any) => {
            reject(error);
          }
        );
      } else {
        const apiUrl = `https://api.sunrise-sunset.org/json?lat=${this.latitude}&lng=${this.longitude}&date=${ddd}&formatted=0`;
        this.http.get(apiUrl).subscribe(
          (response: any) => {
            resolve(response);
          },
          (error: any) => {
            reject(error);
          }
        );
      }
    });
  }

  isSunset(ddd: any): Observable<boolean> {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.getSunsetTime(ddd).then(
          (response: any) => {
            const sunsetTimeUTC = new Date(response.results.sunset);
            const sunsetTimeBDT = new Date(sunsetTimeUTC.getTime());    //    + (this.BDT_OFFSET * 60000)
            // Create a Date object for the specific date
            const specificDate = new Date(ddd);
            // Get the current time
            const now = new Date();
            // Set the time of the specific date to the current time
            specificDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

            const currentTimeBDT = specificDate;
            // console.log(ddd, currentTimeBDT)
            console.log(currentTimeBDT);
            console.log(sunsetTimeBDT);
            resolve(currentTimeBDT > sunsetTimeBDT);
          },
          (error: any) => {
            console.error('Error fetching sunset time:', error.message);
            reject(error);
          }
        );
      })
    );
  }
}
