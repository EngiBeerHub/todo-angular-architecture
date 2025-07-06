import { Component, input } from '@angular/core';
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
import { CategoryViewModel } from '@todo-angular-architecture/todo';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

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
  constructor() {
    addIcons({ trash });
  }
  // input
  $categories = input.required<CategoryViewModel>();
}
