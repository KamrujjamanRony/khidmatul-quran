import { Component, input } from '@angular/core';

@Component({
    selector: 'P',
    imports: [],
    template: `
    <p class="text-md md:text-lg py-1 text-gray-700 text-justify">{{text()}}</p>
  `
})
export class PComponent {
  readonly text = input.required<any>();
  // @Output() closeModal = new EventEmitter<void>();

  // closeThisModal(): void {
  //   this.closeModal.emit();
  // }

}