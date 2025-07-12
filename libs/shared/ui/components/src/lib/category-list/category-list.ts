import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import {
  CategoryModel,
  CategoryViewModel,
} from '@todo-angular-architecture/todo';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { sleep } from '../utils/sleep';

@Component({
  selector: 'lib-category-list',
  imports: [
    CommonModule,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonIcon,
    IonItemOption,
  ],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryListComponent {
  categorySelected = output<number>();
  categoryDeleted = output<CategoryModel>();

  constructor() {
    addIcons({ trash });
  }
  // input
  $categories = input.required<CategoryViewModel>();

  onCategorySelected(categoryId: number | null) {
    if (categoryId) this.categorySelected.emit(categoryId);
  }

  async onCategoryDeleted(category: CategoryModel, sliding: IonItemSliding) {
    await sliding.close();
    await sleep(400);
    this.categoryDeleted.emit(category);
  }
}
