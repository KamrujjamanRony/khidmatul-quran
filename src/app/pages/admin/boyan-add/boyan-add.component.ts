import { Component, inject, OnInit } from '@angular/core';
import { BoyanService } from '../../../features/services/boyan.service';
import { Subscription } from 'rxjs';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { FormsModule } from '@angular/forms';
import { ConfirmModalComponent } from "../../../components/shared/confirm-modal/confirm-modal.component";
import { AuthService } from '../../../features/services/auth.service';

@Component({
    selector: 'app-boyan-add',
    templateUrl: './boyan-add.component.html',
    styleUrl: './boyan-add.component.css',
    imports: [CoverComponent, FormsModule, ConfirmModalComponent]
})
export class BoyanAddComponent {
  boyanService = inject(BoyanService);
  authService = inject(AuthService);
  user: any;
  
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
      type: '',
      title: '',
      description: '',
      url: '',
      others: '',
      imageUrl: '',
      userName: ''
    };
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('serial', this.model.serial);
    formData.append('type', this.model.type || '');
    formData.append('title', this.model.title || '');
    formData.append('description', this.model.description || '');
    formData.append('url', this.model.url || '');
    formData.append('imageUrl', this.model.imageUrl || '');
    formData.append('others', this.model.others || '');
    formData.append('userName', this.user?.name || '');

    this.addCareerSubscription = this.boyanService.addBoyan(formData)
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
