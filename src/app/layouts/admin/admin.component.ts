import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { environment } from '../../../environments/environments';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';

@Component({
    selector: 'app-admin',
    standalone: true,
    templateUrl: './admin.component.html',
    styleUrl: './admin.component.css',
    imports: [FormsModule, CommonModule, RouterOutlet, ReactiveFormsModule, SidebarComponent]
})
export class AdminComponent {
    fb = inject(FormBuilder);
    isSubmitted = true;

    userForm = this.fb.group({
      companyID: [environment.code, Validators.required],
      password: ['', Validators.required],
    });
  
    onSubmit(): void {
      console.log(this.userForm.value)
      const {password} = this.userForm.value;
      if (password && password === environment.code) {
        console.log('submitted form', this.userForm.value);
        this.isSubmitted = true;
      }
    }

}
