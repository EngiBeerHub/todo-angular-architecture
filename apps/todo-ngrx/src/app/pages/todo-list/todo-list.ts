import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TodoListComponent,
  TodolistMenuContent,
} from '@todo-angular-architecture/components';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TodoListStore } from './todo-list-store';

@Component({
  imports: [
    CommonModule,
    TodoListComponent,
    IonContent,
    IonLoading,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFooter,
    IonButton,
    IonButtons,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonBackButton,
    IonPopover,
    TodolistMenuContent,
  ],
  providers: [TodoListStore],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListPage {
  // dependencies
  readonly store = inject(TodoListStore);
}
