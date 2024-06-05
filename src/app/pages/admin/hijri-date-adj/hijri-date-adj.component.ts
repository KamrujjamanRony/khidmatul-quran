import { Component, inject } from '@angular/core';
import { HijriDateAdjService } from '../../../features/services/hijri-date-adj.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { ConfirmModalComponent } from "../../../components/shared/confirm-modal/confirm-modal.component";

@Component({
    selector: 'app-hijri-date-adj',
    standalone: true,
    templateUrl: './hijri-date-adj.component.html',
    styleUrl: './hijri-date-adj.component.css',
    imports: [FormsModule, CoverComponent, ConfirmModalComponent]
})
export class HijriDateAdjComponent {
  hijriDate: any;
  HijriDateAdjService = inject(HijriDateAdjService);
  confirmModal: boolean = false;
  private updateSubscription?: Subscription;

  closeModal() {
    this.confirmModal = false;
  }

  constructor() {
    this.hijriDate = {
      dateAdj: '',
      note1Date: '',
      others1: '',
      others2: ''
    }
  }

  ngOnInit(): void {
    this.HijriDateAdjService.getHijriDate().subscribe(Response => {
      this.hijriDate = Response;
      console.log(this.hijriDate)
    })
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('dateAdj', this.hijriDate.dateAdj || '');
    formData.append('note1Date', this.hijriDate.note1Date || '');
    formData.append('others1', this.hijriDate.others1 || '');
    formData.append('others2', this.hijriDate.others2 || '');

    this.updateSubscription = this.HijriDateAdjService.updateHijriDate(formData)
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
