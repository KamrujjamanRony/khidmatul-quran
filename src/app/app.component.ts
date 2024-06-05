import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import * as AOS from 'aos';
import { AngularQueryDevtools } from '@tanstack/angular-query-devtools-experimental';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HttpClientModule, AngularQueryDevtools]
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
