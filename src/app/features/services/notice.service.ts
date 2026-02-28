import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  http = inject(HttpClient)

  addNotice(model: any | FormData): Observable<void>{
    return this.http.post<void>(`${environment.noticeApi}`, model)
  }

  getAllNotice(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.noticeApi}`);
  }

  getNotice(id: any): Observable<any>{
    return this.http.get<any>(`${environment.noticeApi}/GetNoticeById?id=${id}`);
  }

  updateNotice(id: any, updateNoticeRequest: any | FormData): Observable<any>{
    return this.http.put<any>(`${environment.noticeApi}/EditNotice/${id}`, updateNoticeRequest);
  }

  deleteNotice(id: any): Observable<any>{
    return this.http.delete<any>(`${environment.noticeApi}/DeleteAddress?id=${id}`);
  }
}
