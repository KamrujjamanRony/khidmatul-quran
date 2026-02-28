import { Component, input } from '@angular/core';

@Component({
  selector: 'P',
  imports: [],
  template: `
    <p class="text-lg md:text-xl py-1 text-gray-700 text-justify">{{text()}}</p>
  `
})
export class PComponent {
  readonly text = input.required<any>();
  // @Output() closeModal = new EventEmitter<void>();

  // closeThisModal(): void {
  //   this.closeModal.emit();
  // }

}