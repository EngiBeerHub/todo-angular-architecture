export interface TodoDto {
  id: number | null;
  title: string;
  description: string | null;
  dueDate: string | null;
  isDone: boolean;
}

export interface TodoModel {
  id: number | null;
  title: string;
  description: string | null;
  dueDate: string | null;
  isDone: boolean;
}

export interface TodosViewModel {
  todos: TodoModel[];
}

export interface TodosState {
  todos: TodoModel[];
  isLoading: boolean;
  error: string | null;
}
