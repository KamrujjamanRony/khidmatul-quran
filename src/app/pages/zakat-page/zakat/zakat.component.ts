import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZakatService } from '../../../features/services/zakat.service';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { BanglaPipe } from "../../../features/pipe/bangla.pipe";

@Component({
    selector: 'app-zakat',
    standalone: true,
    templateUrl: './zakat.component.html',
    styleUrl: './zakat.component.css',
    imports: [FormsModule, BengaliDatePipe, BanglaPipe]
})
export class ZakatComponent {
  forayez: any;
  ZakatService = inject(ZakatService);
  selectedUnit: string = 'ভরি';

  constructor(){}
  
  ngOnInit(): void {
    this.ZakatService.getZakat().subscribe(Response => {
      this.forayez = Response;
    })
  }

}
