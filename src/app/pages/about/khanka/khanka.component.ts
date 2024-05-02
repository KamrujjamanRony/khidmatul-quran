import { Component } from '@angular/core';
import { Card1Component } from "../../../components/shared/text/card1";

@Component({
    selector: 'app-khanka',
    standalone: true,
    templateUrl: './khanka.component.html',
    styleUrl: './khanka.component.css',
    imports: [Card1Component]
})
export class KhankaComponent {

}
