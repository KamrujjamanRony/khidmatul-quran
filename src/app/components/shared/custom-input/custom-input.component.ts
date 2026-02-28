import { Component, Input, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'custom-input',
    imports: [FormsModule],
    templateUrl: './custom-input.component.html',
    styleUrl: './custom-input.component.css'
})
export class CustomInputComponent {
  readonly title = input.required<any>();
  readonly type = input.required<any>();
  @Input() value!: any;

}
