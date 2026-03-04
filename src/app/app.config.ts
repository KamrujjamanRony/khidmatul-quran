import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withHashLocation, withPreloading } from '@angular/router';
import bn from '@angular/common/locales/bn';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CustomPreLoadingStrategy } from './features/services/custom.preloading';
import { CustomReuseStrategy } from './features/services/route-reuse.strategy';
import { registerLocaleData } from '@angular/common';

registerLocaleData(bn); // Register Bangla locale globally

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withPreloading(CustomPreLoadingStrategy)),
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection()
  ]
};
