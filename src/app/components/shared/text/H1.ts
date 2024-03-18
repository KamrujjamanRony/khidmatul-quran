import { Component, Input } from '@angular/core';

@Component({
  selector: 'H1',
  standalone: true,
  imports: [],
  template: `
    <h2 class="text-xl md:text-2xl font-bold py-2">{{text}}</h2>
  `
})
export class Head1Component {
  @Input() text!: any;
  // @Output() closeModal = new EventEmitter<void>();

  // closeThisModal(): void {
  //   this.closeModal.emit();
  // }

}
