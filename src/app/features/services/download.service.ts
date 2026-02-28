import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  downloadAudioFromGoogleDrive(googleDriveUrl: string, fileName: string): void {
    this.http.get(googleDriveUrl, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'audio/mpeg' });
      saveAs(blob, fileName);
    });
  }
}
