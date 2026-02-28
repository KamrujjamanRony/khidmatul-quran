import { Component, Input, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card2',
  imports: [],
  template: `
    <div class="card lg:card-side bg-slate-100 shadow-xl font-bold">
        <div class="text-left w-full flex flex-col md:flex-row justify-between px-3 md:px-5 lg:px-10 py-5 md:py-7 lg:py-10">
          <div>
          <h2 class="text-3xl text-primary">{{title()}}</h2>
          <p class="text-accent text-md">@if(writer){ <span class="text-black">লেখকঃ</span> {{writer}}  }</p>
          <p class="text-accent text-md">@if(publisher){ <span class="text-black">সংকলনঃ</span> {{publisher}}  }</p>
          </div>
          
          <div class="flex justify-center">
            <button (click)="scrollToTopAndNavigate(link())" class="btn btn-success text-white text-2xl uppercase rounded-sm monospace">বিস্তারিত</button>
          </div>
        </div>
    </div>
  `
})
export class Card2Component {
  readonly title = input.required<any>();
  @Input() writer!: any;
  @Input() publisher!: any;
  readonly link = input.required<any>();

  constructor(private router: Router) { }


  scrollToTopAndNavigate(route: any): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);

    // Navigate to the specified route
    this.router.navigateByUrl(route);
  }
}