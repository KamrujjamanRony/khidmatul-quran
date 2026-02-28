import { Component } from '@angular/core';
import { Head1Component } from "../../shared/text/H1";
import { PComponent } from "../../shared/text/P";
import { Card1Component } from '../../shared/text/card1';

@Component({
    selector: 'app-blog1',
    templateUrl: './blog1.component.html',
    imports: [Head1Component, PComponent, Card1Component]
})
export class Blog1Component {

}
