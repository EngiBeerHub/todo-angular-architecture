import { Injectable } from '@angular/core';
import { GenericHttpService } from '@todo-angular-architecture/generic-http';
import { TodoDto, TodoModel } from '../model/todo.interfaces';
import { TodoAdapter } from '../adapters/todo.adapter';

@Injectable({
  providedIn: 'root',
})
export class TodoHttpService extends GenericHttpService<TodoDto, TodoModel> {
  constructor() {
    super('/todos', '', new TodoAdapter());
  }
}
