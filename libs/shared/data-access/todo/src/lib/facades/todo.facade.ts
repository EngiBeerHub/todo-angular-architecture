import { computed, inject, Injectable } from '@angular/core';
import { ITodoFacade } from './todo.facade.interface';
import { Store } from '@ngrx/store';
import { TodoModel, TodosViewModel } from '../model/todo.interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoActions, TodoEffects, TodoSelectors } from '../state/index';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade implements ITodoFacade {
  protected readonly store = inject(Store);
  private readonly todoEffects = inject(TodoEffects);

  $todosSignal = toSignal(this.store.select(TodoSelectors.selectTodos), {
    initialValue: [],
  });

  // Effective AngularではinclVatなどを組み合わせていたためcomputedが必要だった
  $todos = computed<TodosViewModel>(() => {
    return {
      todos: this.$todosSignal(),
    };
  });

  todoSelector$ = this.todoEffects.getTodoSuccess$;

  resetTodosState(): void {
    this.store.dispatch(TodoActions.resetTodosState());
  }

  addTodo(todo: TodoModel): void {
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  fetchTodos(): void {
    console.log('facade.fetch');
    this.store.dispatch(TodoActions.fetchTodos());
  }

  getTodo(id: number): void {
    this.store.dispatch(TodoActions.getTodo({ id }));
  }

  updateTodo(todo: TodoModel): void {
    this.store.dispatch(TodoActions.updateTodo({ todo }));
  }

  deleteTodo(id: number): void {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}
