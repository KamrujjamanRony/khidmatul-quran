import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CoverComponent } from '../../../components/shared/cover/cover.component';
import { ConfirmModalComponent } from '../../../components/shared/confirm-modal/confirm-modal.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoticeService } from '../../../features/services/notice.service';

@Component({
  selector: 'app-notice-edit',
  standalone: true,
  imports: [FormsModule, CoverComponent, ConfirmModalComponent],
  templateUrl: './notice-edit.component.html',
  styleUrl: './notice-edit.component.css'
})
export class NoticeEditComponent {
  noticeService = inject(NoticeService);
  route = inject(ActivatedRoute);
  
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
      title: '',
      description: '',
      note1: '',
    };
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.noticeService.getNotice(this.id)
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
    formData.append('title', this.model.title || '');
    formData.append('description', this.model.description || '');
    formData.append('note1', this.model.note1 || '');

    if (this.id) {
      this.editSubscription = this.noticeService.updateNotice(this.id, formData)
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
