import { Component } from '@angular/core';
import { Card1Component } from "../../../components/shared/text/card1";

@Component({
    selector: 'app-shayek',
    standalone: true,
    templateUrl: './shayek.component.html',
    styleUrl: './shayek.component.css',
    imports: [Card1Component]
})
export class ShayekComponent {

}
