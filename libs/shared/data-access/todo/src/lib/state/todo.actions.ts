import { createAction, props } from '@ngrx/store';
import { TodoModel } from '../model/todo.interfaces';

export const fetchTodos = createAction(`[Todos] Fetch Todos`);
export const fetchTodosSuccess = createAction(
  `[Todos] Fetch Todos Success`,
  props<{ todos: TodoModel[] }>
);
export const fetchTodosFailed = createAction(`[Todos] Fetch Todos Failed`);
