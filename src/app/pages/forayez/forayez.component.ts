import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ForayezService } from '../../features/services/forayez.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-forayez',
    standalone: true,
    templateUrl: './forayez.component.html',
    styleUrl: './forayez.component.css',
    imports: [FormsModule, CommonModule]
})
export class ForayezComponent {
    forayezService = inject(ForayezService);
    model: any;
    asset: any = "1";
    isHusband: boolean = false;
    isWife: boolean = false;
    private forayezSubscription?: Subscription;

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
        const { asset, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, grandson, granddaughter, cousin } = this.model;
        if (husband < 2 && wife < 5 && mother < 2 && father < 2 && grandfather < 2 && grandmother < 2) {

            const formData = new FormData();

            formData.append('Asset', this.asset);
            formData.append('TK', this.model.tk || '');
            formData.append('Son', this.model.son || '');
            formData.append('Dau', this.model.daughter || '');
            formData.append('Hus', this.model.husband || '');
            formData.append('Wif', this.model.wife || '');
            formData.append('Fat', this.model.father || '');
            formData.append('Mot', this.model.mother || '');
            formData.append('Bro', this.model.brother || '');
            formData.append('Sis', this.model.sister || '');
            formData.append('GrF', this.model.grandfather || '');
            formData.append('GrM', this.model.grandmother || '');
            formData.append('GrN', this.model.grandnanny || '');
            formData.append('Unc', this.model.uncle || '');
            formData.append('USo', this.model.cousin || '');
            formData.append('BmB', this.model.BmB || '');
            formData.append('BmS', this.model.BmS || '');
            formData.append('BpB', this.model.BpB || '');
            formData.append('BpS', this.model.BpS || '');
            formData.append('GrS', this.model.grandson || '');
            formData.append('GrD', this.model.granddaughter || '');
            formData.append('Ex1', this.model.Ex1 || '');
            formData.append('Ex2', this.model.Ex2 || '');

            this.forayezSubscription = this.forayezService.addForayez(formData)
                .subscribe({
                    next: (response) => {
                        console.log(response)
                    },
                    error: (error) => {
                        console.error('Error Calculate:', error);
                    }
                });
        } else {
            console.log(asset, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, grandson, granddaughter, cousin)
        }
    }

    onHusbandChange() {
      if (this.model.wife) {
        alert('স্ত্রী উপস্থিত থাকলে স্বামী যোগ করা যাবে না।');
        this.model.husband = '';
      }
    }

    onWifeChange() {
      if (this.model.husband) {
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
