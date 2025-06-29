import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideState, provideStore } from '@ngrx/store';
import { TodoEffects, todoReducer } from './data-access/todo/state';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MockInterceptor } from '@todo-angular-architecture/generic-http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoFeatureKey } from './data-access/todo/state/feature-key';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideStoreDevtools(),
    //   {
    //   maxAge: 25, // Retains last 25 states
    //   autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    //   trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
    //   traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    //   connectInZone: true, // If set to true, the connection is established within the Angular zone
    // }
    provideState({ name: todoFeatureKey, reducer: todoReducer }),
    provideEffects(TodoEffects),
    // provideAnimations(),
    provideHttpClient(withInterceptors([MockInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideIonicAngular({
      mode: 'ios',
    }),
  ],
};
