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
      import('./pages/todo-list/todo-list').then((m) => m.TodoListPage),
  },
];
