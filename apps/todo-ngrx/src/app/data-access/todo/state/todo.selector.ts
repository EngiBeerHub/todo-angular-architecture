import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodosState } from '@todo-angular-architecture/todo';
import { todoFeatureKey } from './feature-key';
import { todoEntityAdapter } from './todo.entity';

export const selectTodosState =
  createFeatureSelector<TodosState>(todoFeatureKey);

const { selectAll } = todoEntityAdapter.getSelectors();

export const selectAllTodos = createSelector(selectTodosState, selectAll);

// Other property selectors
export const selectError = createSelector(
  selectTodosState,
  (state) => state.error
);
export const selectIsLoading = createSelector(
  selectTodosState,
  (state) => state.isLoading
);
