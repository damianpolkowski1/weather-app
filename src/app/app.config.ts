import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import routeConfig from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
  ],
};
