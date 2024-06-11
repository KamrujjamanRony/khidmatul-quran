import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  http = inject(HttpClient);

  private userDateUrl = '../../../assets/data/user-data.json';
  private arabicDateUrl = '../../../assets/data/arabic-data.json';

  // Method to fetch JSON data
  getUserData(): Observable<any> {
    return this.http.get<any>(this.userDateUrl);
  }

  getArabicData(): Observable<any> {
    return this.http.get<any>(this.arabicDateUrl);
  }
}
