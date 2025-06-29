import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { TodoListComponent } from '@todo-angular-architecture/components';

@Component({
  selector: 'app-todo-list-component',
  imports: [CommonModule, IonContent, TodoListComponent],
  template: `
    <!-- TODO: for passing e2e. Remove later. -->
    <h1>Welcome</h1>
    <ion-content color="light">
      <lib-todo-list [todos]="todos"></lib-todo-list>
    </ion-content>
  `,
  styles: ``,
})
export class TodoListPage {
  // TODO: change type
  todos = ['Task1', 'Task2', 'Task3', 'Task4', 'Task5'];
}
