import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() title!: any;
  @Input() url!: any;
  @Output() closeModal = new EventEmitter<void>();
  router = inject(Router);

  constructor() { }

  closeThisModal(): void {
    this.closeModal.emit();
    if (this.url) {
      this.router.navigate([this.url]);
    }
  }
}
