import { Component, inject } from '@angular/core';
import { VideoCardComponent } from '../../../components/shared/video-card/video-card.component';
import { BoyanService } from '../../../features/services/boyan.service';
import { Observable } from 'rxjs';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrl: './video.component.css',
    imports: [VideoCardComponent, CoverComponent, CommonModule]
})
export class VideoComponent {
  boyanService = inject(BoyanService);
  allBoyan$?: Observable<any[]>;

  constructor() { }

  ngOnInit(): void {
    this.allBoyan$ = this.boyanService.getBoyanByVideo();
    // this.allBoyan$.subscribe(boyan => {console.log(boyan)});
  }

  sortItems(data: any = []): any {
    if (data) {
      if (data?.length === 0) {
        return data;
      }

      return data.sort((a: any, b: any) => a.serial
        - b.serial
      );
    }
  }

}
