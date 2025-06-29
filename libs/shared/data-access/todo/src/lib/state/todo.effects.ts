import { inject, Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { TodoHttpService } from '../http/todo.http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class TodoEffects {
  private readonly actions = inject(Actions);
  private readonly todoApi = inject(TodoHttpService);
  protected readonly store = inject(Store);
}
