import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BoyanService {
  http = inject(HttpClient)

  addBoyan(model: any | FormData): Observable<void>{
    return this.http.post<void>(`${environment.boyanApi}`, model)
  }

  getAllBoyan(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.boyanApi}`);
  }

  getBoyan(id: any): Observable<any>{
    return this.http.get<any>(`${environment.boyanApi}/GetBoyanById?id=${id}`);
  }

  updateBoyan(id: any, updateBoyanRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`${environment.boyanApi}/EditBoyan/${id}`, updateBoyanRequest);
  }

  deleteBoyan(id: any): Observable<any>{
    return this.http.delete<any>(`${environment.boyanApi}/DeleteBoyan?id=${id}`);
  }
}
