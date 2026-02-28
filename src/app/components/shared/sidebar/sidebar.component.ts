import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../features/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    imports: [RouterLink]
})
export class SidebarComponent {
  authService = inject(AuthService);
  user: any;

  constructor() { }
  
  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  hasRole(role: string): boolean {
    return this.user.roles.includes(role);
  }

  onLogOut(): any {
    this.authService.deleteUser();
  }

}
