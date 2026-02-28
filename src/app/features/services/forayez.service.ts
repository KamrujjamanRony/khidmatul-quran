import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ForayezService {
  http = inject(HttpClient)

  addForayez(model: any | FormData): Observable<void>{
    return this.http.post<void>(`${environment.forayezApi}`, model)
  }
}
