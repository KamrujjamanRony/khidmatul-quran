import { Component, inject } from '@angular/core';
import { ZakatService } from '../../../features/services/zakat.service';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { ConfirmModalComponent } from "../../../components/shared/confirm-modal/confirm-modal.component";
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CustomInputComponent } from '../../../components/shared/custom-input/custom-input.component';

@Component({
  selector: 'app-jewelry-price',
  standalone: true,
  templateUrl: './jewelry-price.component.html',
  styleUrl: './jewelry-price.component.css',
  imports: [CoverComponent, ConfirmModalComponent, CustomInputComponent, FormsModule]
})
export class JewelryPriceComponent {
  jewelryPrice: any;
  ZakatService = inject(ZakatService);
  confirmModal: boolean = false;
  private updateSubscription?: Subscription;

  closeModal() {
    this.confirmModal = false;
  }

  constructor() {
    this.jewelryPrice = {
      gold18k : "",
      gold21k : "",
      gold22k : "",
      goldTd : "",
      silver18k : "",
      silver21k : "",
      silver22k : "",
      silverTd : "",
      updateDate : "",
      nisab : "",
      note : "",
      note1 : ""
    }
  }

  ngOnInit(): void {
    this.ZakatService.getZakat().subscribe(Response => {
      this.jewelryPrice = Response;
      console.log(this.jewelryPrice)
    })
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('gold22k', this.jewelryPrice.gold22k || '');
    formData.append('gold21k', this.jewelryPrice.gold21k || '');
    formData.append('gold18k', this.jewelryPrice.gold18k || '');
    formData.append('goldTd', this.jewelryPrice.goldTd || '');
    formData.append('silver22k', this.jewelryPrice.silver22k || '');
    formData.append('silver21k', this.jewelryPrice.silver21k || '');
    formData.append('silver18k', this.jewelryPrice.silver18k || '');
    formData.append('silverTd', this.jewelryPrice.silverTd || '');
    formData.append('updateDate', this.jewelryPrice.updateDate || '');
    formData.append('nisab', this.jewelryPrice.nisab || '');
    formData.append('note', this.jewelryPrice.note || '');
    formData.append('note1', this.jewelryPrice.note1 || '');

    this.updateSubscription = this.ZakatService.updateZakat(formData)
      .subscribe({
        next: (response) => {
          console.log(response)
          // toast
          this.confirmModal = true;
        },
        error: (error) => {
          console.error('Error updating:', error);
        }
      });
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

}