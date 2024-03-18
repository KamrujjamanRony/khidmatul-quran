import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'card2',
    standalone: true,
    imports: [],
    template: `
    <div class="card lg:card-side bg-slate-100 shadow-xl">
        <div class="text-left w-full flex justify-between px-3 md:px-5 lg:px-10 py-5 md:py-7 lg:py-10">
          <div>
          <h2 class="text-2xl text-primary">{{title}}</h2>
          <span class="text-accent text-sm">@if(writer){( {{writer}}  )}</span>
          </div>
          
          <div class="flex justify-end">
            <button (click)="scrollToTopAndNavigate(link)" class="btn btn-primary text-white font-thin uppercase rounded-sm monospace">view details</button>
          </div>
        </div>
    </div>
  `
})
export class Card2Component {
    @Input() title!: any;
    @Input() writer!: any;
    @Input() link!: any;

    constructor(private router: Router){}
    
  
    scrollToTopAndNavigate(route: any): void {
      // Scroll to the top of the page
      window.scrollTo(0, 0);
    
      // Navigate to the specified route
      this.router.navigateByUrl(route);
    }
}