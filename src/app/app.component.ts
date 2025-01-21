import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import * as AOS from 'aos';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'The khidmatul-quran';

  constructor(private router: Router) {}

  scrollToTopAndNavigate(route: string): void {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  
    // Navigate to the specified route
    this.router.navigateByUrl(route);
  }

  ngOnInit(): void {
    AOS.init({
      duration: 750,
      delay: 450,
      disable: 'mobile'
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      AOS.refresh()
    }, 500)
  }
}
