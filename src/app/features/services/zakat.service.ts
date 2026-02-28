import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';
import { ForayezModel } from '../model/zakat.model';

@Injectable({
  providedIn: 'root'
})
export class ZakatService {
  http = inject(HttpClient)

  getZakat(): Observable<ForayezModel> {
    return this.http.get<ForayezModel>(`${environment.zakatApi}/GetJewelryById?id=${environment.zakatDataId}`);
  }

  updateZakat(updateData: any | FormData): Observable<any> {
    return this.http.put<any>(`${environment.zakatApi}/EditJewelryP/${environment.zakatDataId}`, updateData);
  }
}
