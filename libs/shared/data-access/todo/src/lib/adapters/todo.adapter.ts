import { ModelAdapter } from '@todo-angular-architecture/generic-http';
import { TodoDto, TodoModel } from '../model/todo.interfaces';

export class TodoAdapter implements ModelAdapter<TodoDto, TodoModel> {
  fromDto(dto: TodoDto): TodoModel {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      dueDate: dto.dueDate,
      isDone: dto.isDone,
    };
  }

  toDto(model: TodoModel): TodoDto {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      dueDate: model.dueDate,
      isDone: model.isDone,
    };
  }
}
