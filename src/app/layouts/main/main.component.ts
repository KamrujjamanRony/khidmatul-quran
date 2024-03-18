import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { FooterComponent } from "../../components/shared/footer/footer.component";
import { environment } from '../../../environments/environments';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [CommonModule, RouterOutlet, FormsModule, NavbarComponent, FooterComponent, ReactiveFormsModule]
})
export class MainComponent {
    fb = inject(FormBuilder);
    isSubmitted = false;

    userForm = this.fb.group({
      companyID: [environment.hospitalCode, Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  
    onSubmit(): void {
      console.log(this.userForm.value)
      const {username, password} = this.userForm.value;
      if (username && password) {
        console.log('submitted form', this.userForm.value);
        this.isSubmitted = true;
      }
    }
}
