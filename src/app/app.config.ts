import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { IATARoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(IATARoutes), provideAnimations(), provideAnimationsAsync()],
};
