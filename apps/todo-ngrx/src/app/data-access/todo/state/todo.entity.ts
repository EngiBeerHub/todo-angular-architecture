import { createEntityAdapter } from '@ngrx/entity';
import { TodoModel } from '@todo-angular-architecture/todo';

export const todoEntityAdapter = createEntityAdapter<TodoModel>();
