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
        const {asset, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, grandson, granddaughter, cousin} = this.model;
        if (asset && husband < 2 && wife < 5 && mother < 2 && father < 2 && grandfather < 2 && grandmother < 2) {
            console.log("all ok")
        } else {
            console.log(asset, son, daughter, husband, wife, father, mother, brother, sister, grandfather, grandmother, uncle, grandnanny, BmB, BmS, BpB, BpS, grandson, granddaughter, cousin)
        }
    }

    ngOnChanges() {
      console.log('selectedUnit changed to:', this.selectedUnit);
    }

}
