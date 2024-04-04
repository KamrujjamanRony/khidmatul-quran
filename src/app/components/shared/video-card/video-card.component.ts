import { Component, Input } from '@angular/core';
import { VideoPopupComponent } from '../video-popup/video-popup.component';

@Component({
  selector: 'app-video-card',
  standalone: true,
  imports: [VideoPopupComponent],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
  @Input() title!: any;
  @Input() img!: any;
  @Input() videoId!: any;
  showVideoPopup = false;

  openVideo(): void {
    this.showVideoPopup = true;
  }
  closeVideo(): void {
    this.showVideoPopup = false;
  }

}
