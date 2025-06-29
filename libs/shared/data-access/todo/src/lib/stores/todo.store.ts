import { inject, Injectable, signal } from '@angular/core';
import { TodoHttpService } from '../http/todo.http';
import { TodoModel } from '../model/todo.interfaces';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoStore {
  protected todoApi = inject(TodoHttpService);

  // これは何に使う？Selectedも用意していない。
  private todo: Subject<TodoModel> = new Subject();
  todo$: Observable<TodoModel> = this.todo.asObservable();

  private todosState = signal<TodoModel[]>([]);
  $todos = this.todosState.asReadonly();

  resetState(): void {
    this.todosState.set([]);
  }

  addTodo(todo: TodoModel): void {
    this.todoApi.post(todo).subscribe({
      next: (addedTodo) => {
        addedTodo.id = !addedTodo.id ? this.$todos().length + 1 : addedTodo.id;
        this.todosState.set([...this.$todos(), addedTodo]);
      },
      error: (err) => {
        console.error('err ==>', err);
      },
    });
  }

  fetchTodos(): void {
    this.todoApi.get().subscribe({
      next: (todos) => this.todosState.set(todos),
      error: (err) => console.error('err =>', err),
    });
  }

  getTodo(id: number): void {
    const todo = this.$todos().find((todo) => todo.id === id);
    if (todo) {
      this.todo.next(todo);
    } else {
      this.fetchTodoById(id);
    }
  }

  updateTodo(todo: TodoModel): void {
    this.todoApi.put(todo).subscribe({
      next: (todo) => {
        this.todosState.set(
          this.$todos().map((td) => (td.id === todo.id ? todo : td))
        );
      },
      error: (err) => {
        console.error('err ==>', err);
      },
    });
  }

  deleteTodo(id: number): void {
    this.todoApi.delete(id).subscribe({
      next: () => {
        this.todosState.set(this.$todos().filter((todo) => todo.id !== id));
      },
      error: (err) => {
        console.error('err ==>', err);
      },
    });
  }

  // TODO: deleted select
  private fetchTodoById(id: number) {
    this.todoApi.getById(id).subscribe({
      next: (todo) => this.todo.next(todo),
      error: (err) => {
        console.error('err ==>', err);
      },
    });
  }
}
