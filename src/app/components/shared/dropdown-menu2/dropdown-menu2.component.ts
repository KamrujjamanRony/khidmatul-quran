import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-dropdown-menu2',
    imports: [RouterLink],
    templateUrl: './dropdown-menu2.component.html',
    styleUrl: './dropdown-menu2.component.css'
})
export class DropdownMenu2Component {

  readonly head = input.required<string>();
  readonly menu = input.required<any>();
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
