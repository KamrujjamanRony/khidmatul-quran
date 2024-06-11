import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'user';

  setUser(value: any) {
    // Save userID to local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
  }

  getUser() {
    // Retrieve userID from local storage
    const storedUser = localStorage.getItem(this.localStorageKey);
    return storedUser ? JSON.parse(storedUser) : null;
  }

  deleteUser() {
    // Remove userID from local storage
    localStorage.removeItem(this.localStorageKey);
    window.location.reload();
  }
}
