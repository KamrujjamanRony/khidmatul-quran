import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZakatService } from '../../../features/services/zakat.service';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { BanglaFixedPipe } from '../../../features/pipe/bangla-fixed.pipe';

@Component({
  selector: 'app-zakat',
  templateUrl: './zakat.component.html',
  styleUrl: './zakat.component.css',
  imports: [FormsModule, BengaliDatePipe, BanglaFixedPipe]
})
export class ZakatComponent {
  forayez = signal<any>(null);
  ZakatService = inject(ZakatService);
  asset: string = 'ভরি';

  constructor() { }

  ngOnInit(): void {
    this.ZakatService.getZakat().subscribe(Response => {
      this.forayez.set(Response);
      // console.log(this.forayez())
    })
  }

}
