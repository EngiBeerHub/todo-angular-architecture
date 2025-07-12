import { computed, inject, Injectable } from '@angular/core';
import {
  ITodoFacade,
  TodoModel,
  TodosViewModel,
} from '@todo-angular-architecture/todo';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodoActions, TodoSelectors } from '../state';
import { CategorySelectors } from '../../category/state';

@Injectable({
  providedIn: 'root',
})
export class TodoFacade implements ITodoFacade {
  protected readonly store = inject(Store);

  private $_allTodosSignal = toSignal(
    this.store.select(TodoSelectors.selectAllTodos),
    {
      initialValue: [],
    }
  );

  private $_todosByCategorySignal = toSignal(
    this.store.select(TodoSelectors.selectTodosByCategory),
    {
      initialValue: [],
    }
  );

  private $_categorySignal = toSignal(
    this.store.select(CategorySelectors.selectCategoryById)
  );

  // ViewModel by current state
  $todosViewModel = computed<TodosViewModel>(() => ({
    categoryName: this.$_categorySignal()?.title ?? '',
    todos: this.$_todosByCategorySignal(),
  }));

  $isLoading = toSignal(this.store.select(TodoSelectors.selectIsLoading), {
    initialValue: false,
  });

  resetTodosState(): void {
    this.store.dispatch(TodoActions.resetTodosState());
  }

  addTodo(todo: TodoModel): void {
    // APIがidを採番してくれないためサンプルアプリ固有でidをインクリメントする
    const maxId = Math.max(
      0,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...this.$_allTodosSignal().map((todo) => todo.id!)
    );
    todo.id = maxId + 1;

    // set categoryId from current category
    const category = this.$_categorySignal();
    if (category) todo.categoryId = category.id;

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
