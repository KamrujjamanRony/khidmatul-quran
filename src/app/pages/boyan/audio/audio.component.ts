import { Component } from '@angular/core';
import { AudioCardComponent } from '../../../components/shared/audio-card/audio-card.component';

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [AudioCardComponent],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.css'
})
export class AudioComponent {

}
