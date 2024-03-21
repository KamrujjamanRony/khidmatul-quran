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

  constructor(){}
  
  ngOnInit(): void {
    this.forayezService.getForayez().subscribe(Response => {
      this.forayez = Response;
      console.log(Response)
    })
  }

}
