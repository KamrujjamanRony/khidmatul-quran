import { Component, input } from '@angular/core';
import { DownloadService } from '../../../features/services/download.service';

@Component({
    selector: 'app-audio-card',
    imports: [],
    templateUrl: './audio-card.component.html',
    styleUrl: './audio-card.component.css'
})
export class AudioCardComponent {
  readonly title = input.required<any>();
  readonly googleDriveUrl = input.required<any>();

  
  constructor(private downloadService: DownloadService) {}

  downloadAudio(): void {
    const fileName = `${this.title()}.mp3`; // Change the file name as needed
    this.downloadService.downloadAudioFromGoogleDrive(this.googleDriveUrl(), fileName);
  }

}
