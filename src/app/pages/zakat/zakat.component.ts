import { Component, inject } from '@angular/core';
import { ForayezService } from '../../features/services/forayez.service';
import { BanglaPipe } from '../../features/pipe/bangla.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-zakat',
  standalone: true,
  imports: [BanglaPipe, FormsModule],
  templateUrl: './zakat.component.html',
  styleUrl: './zakat.component.css'
})
export class ZakatComponent {
  forayez: any;
  forayezService = inject(ForayezService);
  selectedUnit: string = 'ভরি';
  model: any;
  totalGold: number = 0;
  totalSilver: number = 0;

  constructor(){
    // Initialize model properties
    this.model = {
      gold_22: 0,
      gold_21: 0,
      gold_18: 0,
      gold_td: 0,
      silver_22: 0,
      silver_21: 0,
      silver_18: 0,
      silver_td: 0,
    };
  }
  
  ngOnInit(): void {
    this.forayezService.getForayez().subscribe(Response => {
      this.forayez = Response[0];
    })
  }

  onInputChange(event: any) {
    const {gold_22, gold_21, gold_18, gold_td, silver_22, silver_21, silver_18, silver_td} = this.model;
    const {gold_22k, gold_21k, gold_18k, gold_traditional, silver_22k, silver_21k, silver_18k, silver_traditional} = this.forayez;
    this.totalGold = (gold_22 * gold_22k * 0.8) + (gold_21 * gold_21k * 0.8) + (gold_18 * gold_18k * 0.8) + (gold_td * gold_traditional * 0.8);
    this.totalSilver = (silver_22 * silver_22k * 0.8) + (silver_21 * silver_21k * 0.8) + (silver_18 * silver_18k * 0.8) + (silver_td * silver_traditional * 0.8);
  }

}
