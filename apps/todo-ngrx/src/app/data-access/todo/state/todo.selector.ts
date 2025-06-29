import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from '@todo-angular-architecture/todo';
import { todoFeatureKey } from './feature-key';

export const selectTodosState =
  createFeatureSelector<TodosState>(todoFeatureKey);
export const selectTodos = createSelector(
  selectTodosState,
  (state) => state.todos
);
export const selectError = createSelector(
  selectTodosState,
  (state) => state.error
);
export const selectIsLoading = createSelector(
  selectTodosState,
  (state) => state.isLoading
);
