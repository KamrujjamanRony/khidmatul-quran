import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { HijriDateAdjService } from '../../../features/services/hijri-date-adj.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CoverComponent } from "../../../components/shared/cover/cover.component";
import { ConfirmModalComponent } from "../../../components/shared/confirm-modal/confirm-modal.component";
import { AuthService } from '../../../features/services/auth.service';

@Component({
  selector: 'app-hijri-date-adj',
  templateUrl: './hijri-date-adj.component.html',
  styleUrl: './hijri-date-adj.component.css',
  imports: [FormsModule, CoverComponent, ConfirmModalComponent]
})
export class HijriDateAdjComponent {
  authService = inject(AuthService);
  cdRef = inject(ChangeDetectorRef);
  HijriDateAdjService = inject(HijriDateAdjService);
  user: any;
  hijriDate: any;
  confirmModal: boolean = false;
  private updateSubscription?: Subscription;

  closeModal() {
    this.confirmModal = false;
  }

  constructor() {
    this.hijriDate = {
      dateAdj: '',
      heading: '',
      description: '',
      heading2: '',
      description2: '',
      heading3: '',
      description3: '',
      bidath: '',
      bidathDescription: '',
      audioUrl: '',
      others: '',
      userName: ''
    }
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.HijriDateAdjService.getHijriDateAdj().subscribe(Response => {
      this.hijriDate = Response;
      // Manually triggering change detection
      this.cdRef.markForCheck();
    })
  }

  // Handle form submission
  onFormSubmit(): void {
    const formData = new FormData();

    formData.append('dateAdj', this.hijriDate.dateAdj || '');
    formData.append('heading', this.hijriDate.heading || '');
    formData.append('description', this.hijriDate.description || '');
    formData.append('heading2', this.hijriDate.heading2 || '');
    formData.append('description2', this.hijriDate.description2 || '');
    formData.append('heading3', this.hijriDate.heading3 || '');
    formData.append('description3', this.hijriDate.description3 || '');
    formData.append('bidath', this.hijriDate.bidath || '');
    formData.append('bidathDescription', this.hijriDate.bidathDescription || '');
    formData.append('audioUrl', this.hijriDate.audioUrl || '');
    formData.append('others', this.hijriDate.others || '');
    formData.append('userName', this.user?.name || '');

    this.updateSubscription = this.HijriDateAdjService.updateHijriDateAdj(formData)
      .subscribe({
        next: (response) => {
          // console.log(response)
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
