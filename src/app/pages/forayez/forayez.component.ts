import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForayezService } from '../../features/services/forayez.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../components/shared/confirm-modal/confirm-modal.component';
import { BanglaPipe } from '../../features/pipe/bangla.pipe';
import { LoaderComponent } from "../../components/loader/loader.component";
@Component({
  selector: 'app-forayez',
  templateUrl: './forayez.component.html',
  styleUrl: './forayez.component.css',
  imports: [FormsModule, CommonModule, ConfirmModalComponent, BanglaPipe, LoaderComponent]
})
export class ForayezComponent {
  forayezService = inject(ForayezService);
  model: any;
  result = signal<any>(null);
  asset = signal<any>("1");
  isHusband = signal<boolean>(false);
  isWife = signal<boolean>(false);
  loading = signal<boolean>(false);
  private forayezSubscription?: Subscription;
  confirmModal = signal<boolean>(false);
  confirmModal1 = signal<boolean>(false);
  confirmModal2 = signal<boolean>(false);
  confirmModal3 = signal<boolean>(false);
  confirmModal4 = signal<boolean>(false);
  confirmModal5 = signal<boolean>(false);
  confirmModal6 = signal<boolean>(false);
  confirmModal7 = signal<boolean>(false);
  confirmModal8 = signal<boolean>(false);
  confirmModal9 = signal<boolean>(false);

  closeModal() {
    this.confirmModal.set(false);
    this.confirmModal1.set(false);
    this.confirmModal2.set(false);
    this.confirmModal3.set(false);
    this.confirmModal4.set(false);
    this.confirmModal5.set(false);
    this.confirmModal6.set(false);
    this.confirmModal7.set(false);
    this.confirmModal8.set(false);
    this.confirmModal9.set(false);
  }

  constructor() {
    // Initialize model properties
    this.model = {
      tk: null,
      son: null,
      daughter: null,
      husband: null,
      wife: null,
      father: null,
      mother: null,
      brother: null,
      sister: null,
      grandfather: null,
      grandmother: null,
      uncle: null,
      grandnanny: null,
      BmB: null,
      BmS: null,
      BpB: null,
      BpS: null,
      BSo: null,
      grandson: null,
      granddaughter: null,
      cousin: null,
      Ex1: null,
      Ex2: null,
    };
  }

  onFormSubmit() {
    this.loading.set(true);
    const { tk, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, BSo, grandson, granddaughter, cousin, Ex1, Ex2 } = this.model;
    if ((son || daughter || husband || wife || father || mother || brother || sister || grandfather || grandmother || uncle || grandnanny || BmB || BmS || BpB || BpS || BSo || grandson || granddaughter || cousin) && (husband < 2 && wife < 5 && mother < 2 && father < 2 && grandfather < 2)) {

      const formData = new FormData();

      formData.append('Asset', this.asset());
      formData.append('TK', tk || '');
      formData.append('Son', son || '');
      formData.append('Dau', daughter || '');
      formData.append('Hus', husband || '');
      formData.append('Wif', wife || '');
      formData.append('Fat', father || '');
      formData.append('Mot', mother || '');
      formData.append('Bro', brother || '');
      formData.append('Sis', sister || '');
      formData.append('GrF', grandfather || '');
      formData.append('GrM', grandmother || '');
      formData.append('GrN', grandnanny || '');
      formData.append('Unc', uncle || '');
      formData.append('USo', cousin || '');
      formData.append('BmB', BmB || '');
      formData.append('BmS', BmS || '');
      formData.append('BpB', BpB || '');
      formData.append('BpS', BpS || '');
      formData.append('BSo', BSo || '');
      formData.append('GrS', grandson || '');
      formData.append('GrD', granddaughter || '');
      formData.append('Ex1', Ex1 || '');
      formData.append('Ex2', Ex2 || '');

      this.forayezSubscription = this.forayezService.addForayez(formData)
        .subscribe({
          next: (response) => {
            this.result.set(response);
            // Scroll to the top of the page
            setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: 'smooth' }), 1000);

            if (this.result()?.notFound) {
              this.confirmModal.set(true);
            }

            this.loading.set(false);
          },
          error: (error) => {
            console.error('Error Calculate:', error);
            this.loading.set(false);
          }
        });
    } else {
      console.log("validation failed")
      this.loading.set(false);
    }
  }

  onClear(event: any) {
    event.preventDefault();
    this.model = {
      tk: null,
      son: null,
      daughter: null,
      husband: null,
      wife: null,
      father: null,
      mother: null,
      brother: null,
      sister: null,
      grandfather: null,
      grandmother: null,
      uncle: null,
      grandnanny: null,
      BmB: null,
      BmS: null,
      BpB: null,
      BpS: null,
      BSo: null,
      grandson: null,
      granddaughter: null,
      cousin: null,
      Ex1: null,
      Ex2: null,
    };
    this.result.set(null);
  }

  onHusbandChange() {
    if (this.model.wife > 0) {
      this.confirmModal1.set(true);
      this.model.husband = '';
    }
    if (this.model.husband > 1) {
      this.confirmModal3.set(true);
      this.model.husband = 1;
    }
  }

  onWifeChange() {
    if (this.model.husband > 0) {
      this.confirmModal2.set(true);
      this.model.wife = '';
    }
    if (this.model.wife > 4) {
      this.confirmModal4.set(true);
      this.model.wife = 4;
    }
  }

  onFatherChange() {
    if (this.model.father > 1) {
      this.confirmModal5.set(true);
      this.model.father = 1;
    }
  }
  onMotherChange() {
    if (this.model.mother > 1) {
      this.confirmModal6.set(true);
      this.model.mother = 1;
    }
  }
  onGrandfatherChange() {
    if (this.model.grandfather > 1) {
      this.confirmModal7.set(true);
      this.model.grandfather = 1;
    }
  }

  ngOnChanges() {
    console.log('asset changed to:', this.asset);
  }

  // Unsubscribe from the subscription to avoid memory leaks
  ngOnDestroy(): void {
    this.forayezSubscription?.unsubscribe();
  }

}
