import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
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

  getBoyanByType(type: any): Observable<any[]> {
    return this.getAllBoyan().pipe(
      map(data => {
        return data.filter(boyan => {
          switch (type) {
            case "1":
              return boyan.type === "কুরআনের তাফসীর";
            case "2":
              return boyan.type === "সংক্ষিপ্ত নসিয়ত";
            case "3":
              return boyan.type === "ইসলাহী মজলিশ";
            default:
              return boyan.type === "ইউটিউব অডিও";
          }
        });
      })
    );
  }

  getBoyanByVideo(): Observable<any[]> {
    return this.getAllBoyan().pipe(
      map(data => {
        return data.filter(boyan => boyan.type === "ইউটিউব ভিডিও");
      })
    );
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
