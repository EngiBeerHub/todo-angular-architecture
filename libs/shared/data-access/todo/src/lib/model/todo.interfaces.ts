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

export interface TodosState {
  expenses: TodoModel[];
  isLoading: boolean;
  error: string | null;
}
