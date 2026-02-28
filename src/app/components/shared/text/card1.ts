import { Component, Input } from '@angular/core';
import { PComponent } from './P';
import { Head1Component } from './H1';

@Component({
    selector: 'card1',
    imports: [Head1Component, PComponent],
    template: `
    <div>
        @if(heading){<H1 class="text-center text-green-500 font-bold" [text]="heading"></H1>}
        @if(head){<H1 class="text-rose-600" [text]="head"></H1>}
        @if(title){<P [text]="title"></P>}
        @if(arabic){<p class="text-right font-bold text-black text-2xl py-1">{{arabic}}</p>}
        @if(bangla){<P [text]="bangla"></P>}
        @if(bangla1){<P [text]="bangla1"></P>}
        @if(bangla2){<P [text]="bangla2"></P>}
        @if(bangla3){<P [text]="bangla3"></P>}
        @if(bangla4){<P [text]="bangla4"></P>}
        @if(bangla5){<P [text]="bangla5"></P>}
        @if(bangla6){<P [text]="bangla6"></P>}
        @if(bangla7){<P [text]="bangla7"></P>}
        @if(bangla8){<P [text]="bangla8"></P>}
        @if(bangla9){<P [text]="bangla9"></P>}
        @if(bangla10){<P [text]="bangla10"></P>}
    </div>
  `
})
export class Card1Component {
    @Input() heading!: any;
    @Input() head!: any;
    @Input() title!: any;
    @Input() arabic!: any;
    @Input() bangla!: any;
    @Input() bangla1!: any;
    @Input() bangla2!: any;
    @Input() bangla3!: any;
    @Input() bangla4!: any;
    @Input() bangla5!: any;
    @Input() bangla6!: any;
    @Input() bangla7!: any;
    @Input() bangla8!: any;
    @Input() bangla9!: any;
    @Input() bangla10!: any;
}