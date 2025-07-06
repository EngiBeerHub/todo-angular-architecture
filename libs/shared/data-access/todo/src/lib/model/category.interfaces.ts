export interface CategoryDto {
  id: number | null;
  title: string;
  description: string | null;
}

export interface CategoryModel {
  id: number | null;
  title: string;
  description: string | null;
}

export interface CategoryViewModel {
  todos: CategoryModel[];
}

export interface CategoryState {
  categories: CategoryModel[];
  isLoading: boolean;
  error: string | null;
}
