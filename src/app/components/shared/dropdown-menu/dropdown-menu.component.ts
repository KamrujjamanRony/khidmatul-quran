import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  imports: [RouterLink]
})
export class DropdownMenuComponent {
  readonly head = input.required<string>();
  readonly menu = input.required<any>();
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  openDropdown() {
    this.isOpen = true;
  }
  hideDropdown() {
    this.isOpen = false;
    setTimeout(() => {
      this.isOpen
    });
  }
}
