import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-popup',
  standalone: true,
  imports: [],
  templateUrl: './video-popup.component.html',
  styleUrl: './video-popup.component.css'
})
export class VideoPopupComponent {
  @Input() videoUrl!: any;
  @Output() closeVideo = new EventEmitter<void>();
  safeVideoUrl!: SafeResourceUrl;
  
  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoUrl);
  }

  closePopup(): void {
    this.closeVideo.emit();
  }

}
