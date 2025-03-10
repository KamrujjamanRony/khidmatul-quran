import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api'; import { registerLocaleData } from '@angular/common';
import bn from '@angular/common/locales/bn';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

registerLocaleData(bn); // Register Bangla locale globally

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),
    provideHttpClient(withFetch()),
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura
      }
    })
  ]
};
