import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DropdownMenuComponent } from "../shared/dropdown-menu/dropdown-menu.component";
import { DropdownMenu2Component } from "../shared/dropdown-menu2/dropdown-menu2.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, DropdownMenuComponent, DropdownMenu2Component]
})
export class NavbarComponent {
  readonly servicesDropdown = viewChild.required<ElementRef>('servicesDropdown');
  readonly tutorialsDropdown = viewChild.required<ElementRef>('tutorialsDropdown');
  readonly downloadsDropdown = viewChild.required<ElementRef>('downloadsDropdown');

  // Create variables to track dropdown visibility
  isTutorialsDropdownVisible = signal(false);
  isDownloadsDropdownVisible = signal(false);
  isServicesDropdownVisible = signal(false);

  dropdownMenu1 = [
    // {
    //   title : "চল্লিশ দরুদ ও সালাম",
    //   link : "forty-dorud"
    // },
    // {
    //   title : "দোয়ায়ে আবু দারদা (রাঃ)",
    //   link : "doyaye-abu-darda-ra"
    // },
    {
      title: "নির্বাচিত প্রবন্ধসমূহ",
      link: "selected-writings"
    }
  ];

  dropdownMenu2 = [
    {
      title: "স্বর্ণ ও রুপার দাম",
      link: "gold-price"
    },
    {
      title: "যাকাত ক্যালকুলেটর",
      link: "zakat-calculator"
    },
    {
      title: "যাকাত মাসআলা",
      link: "zakat-masala"
    },
  ];

  dropdownMenu3 = [
    {
      title: "কুরআনের তাফসীর",
      link: "audio/1"
    },
    {
      title: "সংক্ষিপ্ত নসিয়ত",
      link: "audio/2"
    },
    {
      title: "ইসলাহী মজলিশ",
      link: "audio/3"
    },
    {
      title: "ইউটিউব অডিও",
      link: "audio/4"
    },
    {
      title: "ইউটিউব ভিডিও",
      link: "video"
    },
  ];

  hideNavMenu() {
    const navMenu = document.getElementById('menubar');
    if (navMenu) {
      navMenu.classList.add('hidden');
    }
  }

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  // Create methods to toggle dropdown visibility
  toggleServicesDropdown() {
    this.isServicesDropdownVisible.set(!this.isServicesDropdownVisible);
  }
  toggleTutorialsDropdown() {
    this.isTutorialsDropdownVisible.set(!this.isTutorialsDropdownVisible);
  }

  toggleDownloadsDropdown() {
    this.isDownloadsDropdownVisible.set(!this.isDownloadsDropdownVisible);
  }

  navigateToContact() {
    this.router.navigate(["about"]);
  }

}
