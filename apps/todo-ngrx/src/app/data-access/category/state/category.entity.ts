import { createEntityAdapter } from '@ngrx/entity';
import { CategoryModel } from '@todo-angular-architecture/todo';

export const categoryEntityAdapter = createEntityAdapter<CategoryModel>();
