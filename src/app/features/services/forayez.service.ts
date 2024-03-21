import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ForayezService {
  http = inject(HttpClient)

  getForayez(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.forayezApi}/GetJewelryById?id=${environment.dataId}`);
  }

  updateForayez(id: string, updateData: any | FormData): Observable<any>{
    return this.http.put<any>(`${environment.forayezApi}/${id}`, updateData);
  }
}
