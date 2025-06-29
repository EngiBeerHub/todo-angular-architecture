import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '@todo-angular-architecture/components';
import { IonContent, IonLoading } from '@ionic/angular/standalone';
import {
  TodoFacade,
  TodoModel,
  TodosViewModel,
} from '@todo-angular-architecture/todo';

@Component({
  imports: [CommonModule, TodoListComponent, IonContent, IonLoading],
  template: `
    <!-- TODO: for passing e2e. Remove later. -->
    <ion-loading [isOpen]="$isLoading()"></ion-loading>
    <h1>Welcome</h1>
    <ion-content color="light">
      <lib-todo-list [$todos]="$todos()"></lib-todo-list>
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
}
