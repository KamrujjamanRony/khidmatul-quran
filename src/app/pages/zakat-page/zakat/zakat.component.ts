import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ZakatService } from '../../../features/services/zakat.service';
import { BengaliDatePipe } from "../../../features/pipe/bengali-date.pipe";
import { BanglaFixedPipe } from '../../../features/pipe/bangla-fixed.pipe';
import { LoaderComponent } from "../../../components/loader/loader.component";
import { JsonDataService } from '../../../features/services/json-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zakat',
  templateUrl: './zakat.component.html',
  styleUrl: './zakat.component.css',
  imports: [FormsModule, BengaliDatePipe, BanglaFixedPipe, LoaderComponent, CommonModule]
})
export class ZakatComponent {
  forayez = signal<any>(null);
  jsonDataService = inject(JsonDataService);
  ZakatService = inject(ZakatService);
  asset: string = 'ভরি';

  constructor() { }

  ngOnInit(): void {
    this.jsonDataService.getZakatData().subscribe(data => {
      if (data?.gold22k) {
        this.forayez.set(data);
      } else {
        this.ZakatService.getZakat().subscribe(Response => {
          this.forayez.set(Response);
        })
      }
    });
  }

}
