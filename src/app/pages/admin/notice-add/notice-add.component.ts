import { Component, inject } from '@angular/core';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { NoticeService } from '../../../features/services/notice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notice-add',
  standalone: true,
  imports: [CoverComponent, FormsModule, ConfirmModalComponent],
  templateUrl: './notice-add.component.html',
  styleUrl: './notice-add.component.css'
})
export class NoticeAddComponent {
  noticeService = inject(NoticeService);
  
  model: any;
  private addCareerSubscription?: Subscription;
  confirmModal: boolean = false;

  closeModal() {
    this.confirmModal = false;
  }

  constructor() {
    // Initialize model properties
    this.model = {
      serial: 500,
      title: '',
      description: '',
      note1: '',
    };
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('serial', this.model.serial);
    formData.append('title', this.model.title || '');
    formData.append('description', this.model.description || '');
    formData.append('note1', this.model.note1 || '');

    this.addCareerSubscription = this.noticeService.addNotice(formData)
      .subscribe({
        next: (response) => {
          // toast
          this.confirmModal = true;
        },
        error: (error) => {
          console.error('Error adding:', error);
        }
      });
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.addCareerSubscription?.unsubscribe();
  }


}
