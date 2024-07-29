import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForayezService } from '../../features/services/forayez.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../components/shared/confirm-modal/confirm-modal.component';
import { BanglaPipe } from '../../features/pipe/bangla.pipe';
@Component({
    selector: 'app-forayez',
    standalone: true,
    templateUrl: './forayez.component.html',
    styleUrl: './forayez.component.css',
    imports: [FormsModule, CommonModule, ConfirmModalComponent, BanglaPipe]
})
export class ForayezComponent {
    forayezService = inject(ForayezService);
    model: any;
    result: any;
    asset: any = "1";
    isHusband: boolean = false;
    isWife: boolean = false;
    private forayezSubscription?: Subscription;
    confirmModal: boolean = false;
  
    closeModal() {
      this.confirmModal = false;
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
            grandson: null,
            granddaughter: null,
            cousin: null,
            Ex1: null,
            Ex2: null,
        };
    }

    onFormSubmit() {
        const { tk, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, grandson, granddaughter, cousin, Ex1, Ex2 } = this.model;
        if ((son || daughter || husband || wife || father || mother || brother || sister || grandfather || grandmother || uncle || grandnanny || BmB || BmS || BpB || BpS || grandson || granddaughter || cousin) && (husband < 2 && wife < 5 && mother < 2 && father < 2 && grandfather < 2)) {

            const formData = new FormData();

            formData.append('Asset', this.asset);
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
            formData.append('GrS', grandson || '');
            formData.append('GrD', granddaughter || '');
            formData.append('Ex1', Ex1 || '');
            formData.append('Ex2', Ex2 || '');

            this.forayezSubscription = this.forayezService.addForayez(formData)
                .subscribe({
                    next: (response) => {
                        this.result = response;
                        if (this.result?.notFound) {
                            this.confirmModal = true;
                        }
                    },
                    error: (error) => {
                        console.error('Error Calculate:', error);
                    }
                });
        } else {
            console.log("validation failed")
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
            grandson: null,
            granddaughter: null,
            cousin: null,
            Ex1: null,
            Ex2: null,
        };
        this.result = null;
    }

    onHusbandChange() {
      if (this.model.wife > 0) {
        alert('স্ত্রী উপস্থিত থাকলে স্বামী যোগ করা যাবে না।');
        this.model.husband = '';
      }
    }

    onWifeChange() {
      if (this.model.husband > 0) {
        alert('স্বামী উপস্থিত থাকলে স্ত্রী যোগ করা যাবে না।');
        this.model.wife = '';
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
