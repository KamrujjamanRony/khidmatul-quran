import { Component, inject } from '@angular/core';
import { JsonDataService } from '../../../features/services/json-data.service';

@Component({
  selector: 'app-forty-dorud',
  standalone: true,
  imports: [],
  templateUrl: './forty-dorud.component.html',
  styleUrl: './forty-dorud.component.css'
})
export class FortyDorudComponent {
  jsonDataService = inject(JsonDataService);
  arabicLanguage: any;
  isPlay: boolean = false;
  selectedArabic: boolean = false;
  selectedBangla: boolean = false;
  selectedDescribe: boolean = false;

  toggleArabic() {
    this.selectedArabic = !this.selectedArabic;
  }

  toggleBangla() {
    this.selectedBangla = !this.selectedBangla;
  }

  toggleDescribe() {
    this.selectedDescribe = !this.selectedDescribe;
  }

  ngOnInit() {
    this.jsonDataService.getArabicData().subscribe(data => {
      this.arabicLanguage = data;
    });
  }

  togglePlay() {
    const player = document.getElementById('player') as HTMLAudioElement;
    if (this.isPlay) {
      player.pause();
    } else {
      player.play();
    }
    this.isPlay = !this.isPlay;
  }

  toggleCollapse(index: number): void {
    this.arabicLanguage[index].isExpanded = !this.arabicLanguage[index].isExpanded;
  }

}
