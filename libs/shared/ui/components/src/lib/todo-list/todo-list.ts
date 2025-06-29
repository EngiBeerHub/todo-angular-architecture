import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
} from '@ionic/angular/standalone';
import { TodoModel, TodosViewModel } from '@todo-angular-architecture/todo';
import { CheckboxCustomEvent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'lib-todo-list',
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonCheckbox,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
  ],
  template: `
    <ion-list [inset]="true">
      @for (todo of $todos().todos; track todo.id) {
      <ion-item-sliding #sliding>
        <ion-item>
          <ion-checkbox
            labelPlacement="end"
            [checked]="todo.isDone"
            (ionChange)="onCheckedChange(todo, $event)"
            >{{ todo.title }}
          </ion-checkbox>
        </ion-item>
        <ion-item-options slot="end">
          <ion-item-option color="danger">
            <ion-icon
              slot="icon-only"
              name="trash"
              (click)="onTodoDeleted(todo, sliding)"
            ></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
      }
    </ion-list>
  `,
  styles: ``,
})
export class TodoListComponent {
  $todos: InputSignal<TodosViewModel> = input.required<TodosViewModel>();
  @Output() checkedChange = new EventEmitter<TodoModel>();
  @Output() todoDeleted = new EventEmitter<TodoModel>();

  constructor() {
    addIcons({ trash });
  }

  onCheckedChange(todo: TodoModel, event: CheckboxCustomEvent) {
    this.checkedChange.emit({ ...todo, isDone: event.detail.checked });
  }

  async onTodoDeleted(todo: TodoModel, sliding: IonItemSliding) {
    await sliding.close();
    this.todoDeleted.emit(todo);
  }
}
