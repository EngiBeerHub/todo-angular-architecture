import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todo-list',
  },
  {
    path: 'todo-list',
    loadComponent: () =>
      import('@todo-angular-architecture/pages').then((m) => m.TodoList),
  },
];
