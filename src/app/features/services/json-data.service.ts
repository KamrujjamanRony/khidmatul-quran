import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');
    return this.http.get<any>(this.hijriDateAdjUrl, { headers });
  }

  getZakatData(): Observable<any> {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0');
    return this.http.get<any>(this.zakatDataUrl, { headers });
  }
}
