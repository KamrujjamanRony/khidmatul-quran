import { Component, input } from '@angular/core';

@Component({
  selector: 'H1',
  imports: [],
  template: `
    <h2 class="text-2xl md:text-3xl font-bold py-2">{{text()}}</h2>
  `
})
export class Head1Component {
  readonly text = input.required<any>();
  // @Output() closeModal = new EventEmitter<void>();

  // closeThisModal(): void {
  //   this.closeModal.emit();
  // }

}
