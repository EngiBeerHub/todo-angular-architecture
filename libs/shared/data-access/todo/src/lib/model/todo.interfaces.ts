export interface TodoDto {
  id: number | null;
  title: string;
  description: string;
  dueDate: string;
}

export interface TodoModel {
  id: number | null;
  title: string;
  description: string;
  dueDate: string;
}

export interface TodosViewModel {
  todos: TodoModel[];
}

export interface TodosState {
  todos: TodoModel[];
  isLoading: boolean;
  error: string | null;
}
