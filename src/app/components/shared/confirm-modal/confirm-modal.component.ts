import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'confirm-modal',
    imports: [CommonModule],
    templateUrl: './confirm-modal.component.html',
    styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  readonly title = input.required<any>();
  readonly url = input.required<any>();
  readonly closeModal = output<void>();
  router = inject(Router);

  constructor() { }

  closeThisModal(): void {
    this.closeModal.emit();
    const url = this.url();
    if (url) {
      this.router.navigate([url]);
    }
  }
}
