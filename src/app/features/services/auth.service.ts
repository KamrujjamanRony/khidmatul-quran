import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private localStorageKey = 'userID';
  private userID?: any;

  setUserID(value: any) {
    if (value.startsWith(environment.hospitalCode)) {
      this.userID = value;
    } else {
      this.userID = environment.hospitalCode + value;
    }
    
    // Save userID to local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.userID));
  }

  getUserID() {
    // Retrieve userID from local storage
    const storedUserID = localStorage.getItem(this.localStorageKey);
    return storedUserID ? JSON.parse(storedUserID) : null;
  }

  deleteUserID() {
    // Remove userID from local storage
    localStorage.removeItem(this.localStorageKey);
  }
}
