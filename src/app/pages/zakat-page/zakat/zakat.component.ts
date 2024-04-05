import { Component, inject } from '@angular/core';
import { BanglaPipe } from '../../../features/pipe/bangla.pipe';
import { FormsModule } from '@angular/forms';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { ZakatService } from '../../../features/services/zakat.service';

@Component({
    selector: 'app-zakat',
    standalone: true,
    templateUrl: './zakat.component.html',
    styleUrl: './zakat.component.css',
    imports: [BanglaPipe, FormsModule, BengaliDatePipe]
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
