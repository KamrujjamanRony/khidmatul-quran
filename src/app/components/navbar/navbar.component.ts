import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  link?: string;
  subItems?: MenuItem[];
  isOpen?: boolean; // For dropdown state
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [RouterLink, CommonModule]
})
export class NavbarComponent {
  menuItems: MenuItem[] = [
    // { label: 'হোম', link: '/' },
    // { label: 'সালাতের সময়', link: '/salat-times' },
    // { label: 'হিজরী তারিখ', link: '/hijri-date' },
    // { label: 'ফরায়েজ', link: '/forayez' },
    // {
    //   label: 'বিভাগ',
    //   isOpen: false,
    //   subItems: [{ label: 'নির্বাচিত প্রবন্ধসমূহ', link: '/selected-writings' }],
    // },
    // {
    //   label: 'যাকাত',
    //   isOpen: false,
    //   subItems: [
        { label: 'স্বর্ণ ও রুপার দাম', link: '/gold-price' },
        { label: 'যাকাত ক্যালকুলেটর', link: '/zakat-calculator' },
        { label: 'যাকাত মাসআলা', link: '/zakat-masala' },
    //   ],
    // },
    // {
    //   label: 'বয়ান',
    //   isOpen: false,
    //   subItems: [
    //     { label: 'কুরআনের তাফসীর', link: '/audio/1' },
    //     { label: 'সংক্ষিপ্ত নসিয়ত', link: '/audio/2' },
    //     { label: 'ইসলাহী মজলিশ', link: '/audio/3' },
    //     { label: 'ইউটিউব অডিও', link: '/audio/4' },
    //     { label: 'ইউটিউব ভিডিও', link: '/video' },
    //   ],
    // },
    // { label: 'নোটিশ', link: '/notice' },
  ];

  isMobileMenuOpen = false;

  constructor(private router: Router) {
    // Close menu on route change
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMobileMenuOpen = false; // Close menu when route changes
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Close all dropdowns when mobile menu closes
    if (!this.isMobileMenuOpen) {
      this.menuItems.forEach((item) => (item.isOpen = false));
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;

    // Close all dropdowns when mobile menu closes
    if (!this.isMobileMenuOpen) {
      this.menuItems.forEach((item) => (item.isOpen = false));
    }
  }


  toggleDropdown(selectedItem: any, event: Event) {
    // console.log("toggleDropdown", selectedItem);
    event.stopPropagation(); // Prevents click event from propagating

    this.menuItems.forEach((item) => {
      if (item !== selectedItem) {
        item.isOpen = false; // Close other dropdowns
      }
    });

    selectedItem.isOpen = !selectedItem.isOpen; // Toggle the selected dropdown
  }

  onHover(item: any) {
    // console.log("onHover", item);
    if (window.innerWidth >= 1024) {
      this.menuItems.forEach((menu) => {
        if (menu !== item) {
          menu.isOpen = false;
        }
      });
      item.isOpen = true;
    }
  }

  onLeave(item: any) {
    // console.log("onLeave", item);
    if (window.innerWidth >= 1024) {
      item.isOpen = false;
    }
  }


}
