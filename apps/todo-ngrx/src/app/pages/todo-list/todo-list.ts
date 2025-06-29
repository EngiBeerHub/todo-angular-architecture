import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '@todo-angular-architecture/components';
import {
  IonContent,
  IonHeader,
  IonLoading,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  TodoFacade,
  TodoModel,
  TodosViewModel,
} from '@todo-angular-architecture/todo';

@Component({
  imports: [
    CommonModule,
    TodoListComponent,
    IonContent,
    IonLoading,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
  template: `
    <ion-loading [isOpen]="$isLoading()"></ion-loading>

    <ion-header>
      <ion-toolbar>
        <!-- TODO: for passing e2e. Remove later. -->
        <ion-title>Welcome</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">
      <lib-todo-list
        [$todos]="$todos()"
        (checkToggled)="onCheckToggled($event)"
      ></lib-todo-list>
    </ion-content>
  `,
  styles: ``,
})
export class TodoListPage implements OnInit {
  protected readonly todoFacade = inject(TodoFacade);

  // view state
  $todos: Signal<TodosViewModel> = this.todoFacade.$todos;
  $isLoading = this.todoFacade.$isLoading;

  ngOnInit() {
    this.todoFacade.fetchTodos();
  }

  onAddTodo(todoToAdd: TodoModel) {
    this.todoFacade.addTodo(todoToAdd);
  }

  onCheckToggled(event: TodoModel) {
    this.todoFacade.updateTodo(event);
  }
}
