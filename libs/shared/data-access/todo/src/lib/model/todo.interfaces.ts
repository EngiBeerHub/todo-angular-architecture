import { EntityState } from '@ngrx/entity';

export interface TodoDto {
  id: number | null;
  categoryId: number | null;
  title: string;
  description: string | null;
  dueDate: string | null;
  isDone: boolean;
}

export interface TodoModel {
  id: number | null;
  categoryId: number | null;
  title: string;
  description: string | null;
  dueDate: string | null;
  isDone: boolean;
}

export interface TodosViewModel {
  categoryName: string;
  todos: TodoModel[];
}

export interface TodosState extends EntityState<TodoModel> {
  // additional properties to EntityState
  isLoading: boolean;
  error: string | null;
}
