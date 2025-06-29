import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCheckbox, IonItem, IonList } from '@ionic/angular/standalone';
import { TodosViewModel } from '@todo-angular-architecture/todo';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule, IonList, IonItem, IonCheckbox],
  template: `
    <ion-list [inset]="true">
      @for (todo of $todos().todos; track todo.id) {
      <ion-item>
        <ion-checkbox labelPlacement="end">{{ todo.title }}</ion-checkbox>
      </ion-item>
      }
    </ion-list>
  `,
  styles: ``,
})
export class TodoListComponent {
  $todos: InputSignal<TodosViewModel> = input.required<TodosViewModel>();
  // todos = input.required<string[]>();
}
