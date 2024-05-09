import { Component } from '@angular/core';
import { Card1Component } from "../../shared/text/card1";
import { PComponent } from '../../shared/text/P';

@Component({
    selector: 'app-blog4',
    standalone: true,
    templateUrl: './blog4.component.html',
    styleUrl: './blog4.component.css',
    imports: [Card1Component, PComponent]
})
export class Blog4Component {

}
