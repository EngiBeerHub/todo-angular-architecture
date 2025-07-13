import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { CategoryFacade } from '../../data-access/category/facades/category.facade';
import { CategoryListComponent } from '@todo-angular-architecture/components';
import { RefresherManager } from '../../utils/refresher-manager';
import { RefresherCustomEvent } from '@ionic/angular';
import { CategoryModel } from '@todo-angular-architecture/todo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonLoading,
    IonFooter,
    IonButtons,
    IonButton,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    CategoryListComponent,
  ],
  templateUrl: './category-list.html',
  styles: ``,
})
export class CategoryListPage {
  // deps
  protected readonly categoryFacade = inject(CategoryFacade);
  private readonly refresherManager = new RefresherManager(
    this.categoryFacade.$isLoading
  );
  private readonly router = inject(Router);

  // view state
  protected $categoriesViewModel = this.categoryFacade.$categories;
  protected $isDrafting = signal(false);
  protected $showLoading = computed(() => {
    return (
      this.categoryFacade.$isLoading() && !this.refresherManager.$isRefreshing()
    );
  });

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherManager.onRefreshed(event);
    this.categoryFacade.fetchCategories();
  }

  onCategorySelected(categoryId: number) {
    void this.router.navigate(['/category', categoryId, 'todos']);
  }

  onCompleteClicked() {
    this.$isDrafting.set(false);
  }

  onCategoryAdded(category: CategoryModel) {
    this.categoryFacade.addCategory(category);
    this.$isDrafting.set(false);
  }

  onCategoryDeleted(category: CategoryModel) {
    this.categoryFacade.deleteCategory(category.id);
  }
}
