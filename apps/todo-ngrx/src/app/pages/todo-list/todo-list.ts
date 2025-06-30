import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '@todo-angular-architecture/components';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLoading,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TodoModel, TodosViewModel } from '@todo-angular-architecture/todo';
import { TodoFacade } from '../../data-access/todo/facades/todo.facade';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';

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
  ],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListPage implements OnInit {
  protected readonly todoFacade = inject(TodoFacade);

  // view state
  $todos: Signal<TodosViewModel> = this.todoFacade.$todos;
  $isLoading = this.todoFacade.$isLoading;
  $isDrafting = signal(false);

  constructor() {
    addIcons({ addCircle });
  }

  ngOnInit() {
    this.todoFacade.fetchTodos();
  }

  onTodoAdded(todo: TodoModel) {
    if (todo.title) {
      this.todoFacade.addTodo(todo);
    }
    this.$isDrafting.set(false);
  }

  onCheckedChange(event: TodoModel) {
    this.todoFacade.updateTodo(event);
  }

  onTodoDeleted(event: TodoModel) {
    if (event.id) {
      this.todoFacade.deleteTodo(event.id);
    }
  }
}
