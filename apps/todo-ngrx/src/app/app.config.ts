import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideState, provideStore } from '@ngrx/store';
import {
  TodoEffects,
  todoFeatureKey,
  todoReducer,
} from '@todo-angular-architecture/todo';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockInterceptor } from '@todo-angular-architecture/generic-http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState({ name: todoFeatureKey, reducer: todoReducer }),
    provideEffects(TodoEffects),
    provideAnimations(),
    provideHttpClient(withInterceptors([MockInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideIonicAngular({
      mode: 'ios',
    }),
  ],
};
