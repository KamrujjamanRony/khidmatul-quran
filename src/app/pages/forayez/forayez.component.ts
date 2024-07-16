import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
    selector: 'app-forayez',
    standalone: true,
    templateUrl: './forayez.component.html',
    styleUrl: './forayez.component.css',
    imports: [FormsModule]
})
export class ForayezComponent {
    model: any;
    selectedUnit: string = 'টাকা';

    constructor(){
        // Initialize model properties
        this.model = {
            asset: null,
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
        };
      }

    onFormSubmit() {
        throw new Error('Method not implemented.');
    }

    ngOnChanges() {
      console.log('selectedUnit changed to:', this.selectedUnit);
    }

}
