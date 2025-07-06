import { TodoActions } from './index';
import { TodosState } from '@todo-angular-architecture/todo';
import { createReducer, on } from '@ngrx/store';

export const initialTodosState: Readonly<TodosState> = {
  todos: [],
  isLoading: false,
  error: null,
};

export const todoReducer = createReducer<TodosState>(
  initialTodosState,
  on(TodoActions.resetTodosState, () => initialTodosState),
  on(TodoActions.addTodo, (state) => ({
    ...state,
  })),
  on(TodoActions.addTodoSuccess, (state, { todo }) => ({
    ...state,
    isLoading: false,
    todos: [...state.todos, todo],
    error: null,
  })),
  on(TodoActions.addTodoFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to add todo!',
  })),
  on(TodoActions.fetchTodos, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TodoActions.fetchTodosSuccess, (state, { todos }) => ({
    ...state,
    isLoading: false,
    todos,
    error: null,
  })),
  on(TodoActions.fetchTodosFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to fetch todos!',
  })),
  on(TodoActions.updateTodo, (state, { todo }) => ({
    ...state,
    // optimistically update todos
    todos: state.todos.map((td) => (td.id === todo.id ? todo : td)),
    // No loading for preventing aborting user interaction
  })),
  on(TodoActions.updateTodoSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
  })),
  on(TodoActions.updateTodoFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to update todo!',
  })),
  on(TodoActions.deleteTodo, (state) => ({
    ...state,
    // No loading for preventing aborting user interaction
  })),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => ({
    ...state,
    isLoading: false,
    todos: state.todos.filter((todo) => todo.id !== id),
    error: null,
  })),
  on(TodoActions.deleteTodoFailed, (state) => ({
    ...state,
    isLoading: false,
    error: 'Failed to delete todo!',
  }))
);
