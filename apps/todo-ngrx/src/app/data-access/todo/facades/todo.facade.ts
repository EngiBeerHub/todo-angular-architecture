import { computed, inject, Injectable } from '@angular/core';
import {
  ITodoFacade,
  TodoModel,
  TodosViewModel,
} from '@todo-angular-architecture/todo';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoActions, TodoSelectors } from '../state';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade implements ITodoFacade {
  protected readonly store = inject(Store);

  private $_todosSignal = toSignal(
    this.store.select(TodoSelectors.selectTodosByCategory),
    {
      initialValue: [],
    }
  );

  // Effective AngularではinclVatなどを組み合わせていたためcomputedが必要だった
  $todos = computed<TodosViewModel>(() => ({
    todos: this.$_todosSignal(),
  }));

  $isLoading = toSignal(this.store.select(TodoSelectors.selectIsLoading), {
    initialValue: false,
  });

  resetTodosState(): void {
    this.store.dispatch(TodoActions.resetTodosState());
  }

  addTodo(todo: TodoModel): void {
    // APIがidを採番してくれないためサンプルアプリ固有でidをインクリメントする
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const maxId = Math.max(0, ...this.$_todosSignal().map((todo) => todo.id!));
    todo.id = maxId + 1;
    this.store.dispatch(TodoActions.addTodo({ todo }));
  }

  fetchTodos(): void {
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
