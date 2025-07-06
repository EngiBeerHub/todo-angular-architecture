import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todo-list',
  },
  {
    path: 'category-list',
    loadComponent: () =>
      import('./pages/category-list/category-list').then(
        (m) => m.CategoryListPage
      ),
  },
  {
    path: 'todo-list',
    loadComponent: () =>
      import('./pages/todo-list/todo-list').then((m) => m.TodoListPage),
  },
];
