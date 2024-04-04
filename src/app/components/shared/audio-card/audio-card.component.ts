import { Component, Input } from '@angular/core';
import { DownloadService } from '../../../features/services/download.service';

@Component({
  selector: 'app-audio-card',
  standalone: true,
  imports: [],
  templateUrl: './audio-card.component.html',
  styleUrl: './audio-card.component.css'
})
export class AudioCardComponent {
  @Input() title!: any;
  @Input() googleDriveUrl!: any;

  
  constructor(private downloadService: DownloadService) {}

  downloadAudio(): void {
    const fileName = `${this.title}.mp3`; // Change the file name as needed
    this.downloadService.downloadAudioFromGoogleDrive(this.googleDriveUrl, fileName);
  }

}
