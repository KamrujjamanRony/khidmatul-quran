import { Component } from '@angular/core';
import { VideoCardComponent } from '../../../components/shared/video-card/video-card.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [VideoCardComponent],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {

}
