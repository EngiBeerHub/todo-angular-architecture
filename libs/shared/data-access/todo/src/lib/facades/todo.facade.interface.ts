import { Observable } from 'rxjs';
import { TodoModel, TodosViewModel } from '../model/todo.interfaces';
import { Signal } from '@angular/core';

export interface ITodoFacade {
  todoSelector$: Observable<TodoModel>;
  $todos: Signal<TodosViewModel>;
  resetTodosState(): void;
  addTodo(todo: TodoModel): void;
  fetchTodos(): void;
  getTodo(id: number): void;
  updateTodo(todo: TodoModel): void;
  deleteTodo(id: number): void;
}
