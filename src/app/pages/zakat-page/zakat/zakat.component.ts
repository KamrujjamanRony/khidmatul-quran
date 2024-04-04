import { Component, inject } from '@angular/core';
import { ForayezService } from '../../../features/services/forayez.service';
import { BanglaPipe } from '../../../features/pipe/bangla.pipe';
import { FormsModule } from '@angular/forms';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";

@Component({
    selector: 'app-zakat',
    standalone: true,
    templateUrl: './zakat.component.html',
    styleUrl: './zakat.component.css',
    imports: [BanglaPipe, FormsModule, BengaliDatePipe]
})
export class ZakatComponent {
  forayez: any;
  forayezService = inject(ForayezService);
  selectedUnit: string = 'ভরি';

  constructor(){}
  
  ngOnInit(): void {
    this.forayezService.getForayez().subscribe(Response => {
      this.forayez = Response;
    })
  }

}
