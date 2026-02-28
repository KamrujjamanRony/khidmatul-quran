import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/shared/sidebar/sidebar.component';
import { JsonDataService } from '../../features/services/json-data.service';
import { AuthService } from '../../features/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [FormsModule, CommonModule, RouterOutlet, ReactiveFormsModule, SidebarComponent]
})
export class AdminComponent {
  jsonDataService = inject(JsonDataService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  users: any;
  user: any;
  err: any;
  isSubmitted = false;

  ngOnInit() {
    this.user = this.authService.getUser();
    if (this.user) { this.isSubmitted = true; }
    this.jsonDataService.getUserData().subscribe(data => {
      this.users = data;
    });
  }

  userForm = this.fb.group({
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const { password } = this.userForm.value;
    if (password) {
      const user: any = this.users.find((data: any) => data.password === password);
      if (user) {
        this.authService.setUser(user);
        this.isSubmitted = true;
      } else {
        this.err = "Please enter correct password";
      }
    }
  }

}
