import { computed, inject, Injectable } from '@angular/core';
import {
  CategoryModel,
  CategoryViewModel,
  ICategoryFacade,
} from '@todo-angular-architecture/todo';
import { Store } from '@ngrx/store';
import { CategoryActions, CategorySelectors } from '../state';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade implements ICategoryFacade {
  protected readonly store = inject(Store);

  private $_categoriesSignal = toSignal(
    this.store.select(CategorySelectors.selectAllCategories),
    { initialValue: [] }
  );

  $categories = computed<CategoryViewModel>(() => ({
    categories: this.$_categoriesSignal(),
  }));

  $isLoading = toSignal(this.store.select(CategorySelectors.selectIsLoading), {
    initialValue: false,
  });

  resetCategoriesState(): void {
    this.store.dispatch(CategoryActions.resetCategoriesState());
  }
  addCategory(category: CategoryModel): void {
    const maxId = Math.max(
      0,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...this.$_categoriesSignal().map((category) => category.id!)
    );
    category.id = maxId + 1;
    this.store.dispatch(CategoryActions.addCategory({ category }));
  }
  fetchCategories(): void {
    this.store.dispatch(CategoryActions.fetchCategories());
  }
  getCategory(id: number): void {
    this.store.dispatch(CategoryActions.getCategory({ id }));
  }
  updateCategory(category: CategoryModel): void {
    this.store.dispatch(CategoryActions.updateCategory({ category }));
  }
  deleteCategory(id: number): void {
    this.store.dispatch(CategoryActions.deleteCategory({ id }));
  }
}
