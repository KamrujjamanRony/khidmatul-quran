import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  Collapse,
  Dropdown,
  initTE,
} from 'tw-elements';
import { DropdownMenuComponent } from "../shared/dropdown-menu/dropdown-menu.component";
import { DropdownMenu2Component } from "../shared/dropdown-menu2/dropdown-menu2.component";

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, DropdownMenuComponent, DropdownMenu2Component]
})
export class NavbarComponent {
  @ViewChild('servicesDropdown') servicesDropdown!: ElementRef;
  @ViewChild('tutorialsDropdown') tutorialsDropdown!: ElementRef;
  @ViewChild('downloadsDropdown') downloadsDropdown!: ElementRef;

  // Create variables to track dropdown visibility
  isTutorialsDropdownVisible = false;
  isDownloadsDropdownVisible = false;
  isServicesDropdownVisible = false;

  dropdownMenu1 = [
    {
      title : "কিতাব",
      link : "kitab"
    },
    {
      title : "নির্বাচিত প্রবন্ধসমূহ",
      link : "selected-writings"
    }
  ]

  dropdownMenu2 = [
    {
      title : "স্বর্ণ ও রুপার দাম",
      link : "gold-price"
    },
    {
      title : "যাকাত ক্যালকুলেটর",
      link : "zakat-calculator"
    },
    {
      title : "যাকাত মাসআলা",
      link : "zakat-masala"
    },
  ]

  dropdownMenu3 = [
    {
      title : "অডিও",
      link : "audio"
    },
    {
      title : "ভিডিও",
      link : "video"
    },
  ]

  hideNavMenu() {
    const navMenu = document.getElementById('menubar');
    if (navMenu) {
      navMenu.classList.add('hidden');
    }
  }

  constructor(private router: Router) {}


  ngOnInit(): void {
    initTE({ Collapse, Dropdown },
      { allowReinits: true });
  }

  // Create methods to toggle dropdown visibility
  toggleServicesDropdown() {
    this.isServicesDropdownVisible = !this.isServicesDropdownVisible;
  }
  toggleTutorialsDropdown() {
    this.isTutorialsDropdownVisible = !this.isTutorialsDropdownVisible;
  }

  toggleDownloadsDropdown() {
    this.isDownloadsDropdownVisible = !this.isDownloadsDropdownVisible;
  }

  navigateToContact() {
    this.router.navigate(["about"]);
  }

}
