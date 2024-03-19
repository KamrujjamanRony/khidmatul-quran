import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class DropdownMenuComponent {
  @Input() head!: string;
  @Input() menu!: any;
  // isOpen: boolean = false;

  // toggleDropdown() {
  //   this.isOpen = !this.isOpen;
  // }
  // hideDropdown() {
  //   this.isOpen = false;
  // }
}
