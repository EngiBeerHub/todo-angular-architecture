import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCheckbox, IonItem, IonList } from '@ionic/angular/standalone';
import { TodoModel, TodosViewModel } from '@todo-angular-architecture/todo';
import { CheckboxCustomEvent } from '@ionic/angular';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule, IonList, IonItem, IonCheckbox],
  template: `
    <ion-list [inset]="true">
      @for (todo of $todos().todos; track todo.id) {
      <ion-item>
        <ion-checkbox
          labelPlacement="end"
          [checked]="todo.isDone"
          (ionChange)="onCheckToggled(todo, $event)"
          >{{ todo.title }}
        </ion-checkbox>
      </ion-item>
      }
    </ion-list>
  `,
  styles: ``,
})
export class TodoListComponent {
  $todos: InputSignal<TodosViewModel> = input.required<TodosViewModel>();
  @Output() checkToggled = new EventEmitter<TodoModel>();

  onCheckToggled(todo: TodoModel, event: CheckboxCustomEvent) {
    this.checkToggled.emit({ ...todo, isDone: event.detail.checked });
  }
}
