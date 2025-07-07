import { Component, computed, inject, OnInit } from '@angular/core';
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
  styleUrl: './category-list.scss',
})
export class CategoryListPage implements OnInit {
  // deps
  protected readonly categoryFacade = inject(CategoryFacade);
  private readonly refresherManager = new RefresherManager(
    this.categoryFacade.$isLoading
  );

  // view state
  protected $categories = this.categoryFacade.$categories;
  protected $showLoading = computed(() => {
    return (
      this.categoryFacade.$isLoading() && !this.refresherManager.$isRefreshing()
    );
  });

  ngOnInit() {
    this.categoryFacade.fetchCategories();
  }

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherManager.onRefreshed(event);
    this.categoryFacade.fetchCategories();
  }
}
