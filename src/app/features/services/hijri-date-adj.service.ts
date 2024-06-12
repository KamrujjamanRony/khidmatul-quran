import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HijriDateAdjService {
  http = inject(HttpClient)

  getHijriDate(): Observable<any> {
    return this.http.get<any[]>(`${environment.hijriDateApi}/GetHijriDate`);
  }

  getHijriDateAdj(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.hijriDateApi}/GetHijriDateAdjById?id=${environment.hijriDateId}`);
  }

  updateHijriDateAdj(updateData: any | FormData): Observable<any>{
    return this.http.put<any>(`${environment.hijriDateApi}/EditHijriDateAdj/${environment.hijriDateId}`, updateData);
  }
}
