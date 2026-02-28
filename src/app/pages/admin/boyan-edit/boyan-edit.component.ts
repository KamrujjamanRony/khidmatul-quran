import { Component, inject } from '@angular/core';
import { BoyanService } from '../../../features/services/boyan.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { ConfirmModalComponent } from "../../../components/shared/confirm-modal/confirm-modal.component";
import { AuthService } from '../../../features/services/auth.service';

@Component({
    selector: 'app-boyan-edit',
    templateUrl: './boyan-edit.component.html',
    styleUrl: './boyan-edit.component.css',
    imports: [FormsModule, CoverComponent, ConfirmModalComponent]
})
export class BoyanEditComponent {
  boyanService = inject(BoyanService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  user: any;
  
  id: any = null;
  model?: any;
  paramsSubscription?: Subscription;
  editSubscription?: Subscription;
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
      imageUrl: '',
      others: '',
      userName: ''
    };
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.boyanService.getBoyan(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
              }
            });
        }
      }
    });
  }

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

    if (this.id) {
      this.editSubscription = this.boyanService.updateBoyan(this.id, formData)
        .subscribe({
          next: () => {
            // toast
            this.confirmModal = true;
          }
        });
    }
  };

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editSubscription?.unsubscribe();
  }

}
