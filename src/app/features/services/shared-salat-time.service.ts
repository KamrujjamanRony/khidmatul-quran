import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SharedSalatTimeService {
    // Use a signal to store today's salat time
    todaySalatTime = signal<any>(null);

    // Method to update the salat time
    setTodaySalatTime(time: any) {
        this.todaySalatTime.set(time);
    }

    // Method to get the salat time
    getTodaySalatTime() {
        return this.todaySalatTime(); // Return the value of the signal
    }
}