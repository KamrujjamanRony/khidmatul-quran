import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  http = inject(HttpClient);

  private userDataUrl = '../../../assets/data/user-data.json';
  private arabicDataUrl = '../../../assets/data/arabic-data.json';
  private hijriDateAdjUrl = '../../../assets/data/hijri-date-adj.json';
  private zakatDataUrl = '../../../assets/data/zakat-data.json';

  // Method to fetch JSON data
  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDataUrl);
  }

  getArabicData(): Observable<any> {
    return this.http.get<any>(this.arabicDataUrl);
  }

  getHijriDateAdjData(): Observable<any> {
    return this.http.get<any>(this.hijriDateAdjUrl);
  }

  getZakatData(): Observable<any> {
    return this.http.get<any>(this.zakatDataUrl);
  }
}
