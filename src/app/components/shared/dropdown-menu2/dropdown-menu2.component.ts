import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dropdown-menu2',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dropdown-menu2.component.html',
  styleUrl: './dropdown-menu2.component.css'
})
export class DropdownMenu2Component {

  @Input() head!: string;
  @Input() menu!: any;
  isOpen: boolean = false;

  openDropdown() {
    this.isOpen = true;
  }
  hideDropdown() {
    this.isOpen = false;
    setTimeout(()=>{
      this.isOpen
    })
  }
}
