import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { SharedSalatTimeService } from './shared-salat-time.service';

@Injectable({
  providedIn: 'root'
})
export class SunsetService {
  http = inject(HttpClient);
  private sharedSalatTimeService = inject(SharedSalatTimeService);

  getSunsetTime(date: string, location: any): Promise<any> {
    // console.log(this.sharedSalatTimeService.getTodaySalatTime());
    const apiUrl = `https://api.sunrise-sunset.org/json?lat=${location?.latitude}&lng=${location?.longitude}&timezone=UTC+6&date=${date}&formatted=0`;

    return new Promise((resolve, reject) => {
      this.http.get(apiUrl).subscribe(
        (response: any) => {
          resolve(response);
        },
        (error: any) => {
          reject(error);
        }
      );
    });
  }

  isSunset(date: string, location: any): Observable<boolean> {
    return from(
      new Promise<boolean>((resolve, reject) => {
        this.getSunsetTime(date, location).then(
          (response: any) => {
            const sunsetTime = new Date(response.results.sunset);

            // Add 2 minutes to the sunset time
            sunsetTime.setMinutes(sunsetTime.getMinutes() + 2);

            const specificDate = new Date(date);
            const now = new Date();
            specificDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

            const currentTimeBDT = specificDate;

            // console.log(currentTimeBDT + "--------" + sunsetTime);
            resolve(currentTimeBDT > sunsetTime);
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