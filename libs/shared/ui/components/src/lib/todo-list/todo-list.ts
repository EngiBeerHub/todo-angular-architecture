import {
  Component,
  EventEmitter,
  input,
  InputSignal,
  model,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCheckbox,
  IonIcon,
  IonInput,
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
import { FormsModule } from '@angular/forms';

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
    IonInput,
    FormsModule,
  ],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListComponent {
  // input
  $todos: InputSignal<TodosViewModel> = input.required<TodosViewModel>();
  // output
  @Output() todoAdded = new EventEmitter<TodoModel>();
  @Output() checkedChange = new EventEmitter<TodoModel>();
  @Output() todoDeleted = new EventEmitter<TodoModel>();
  // input and output
  $isDrafting = model(false);
  // draft value
  newTodoTitle = '';
  newTodoIsDone = false;

  constructor() {
    addIcons({ trash });
  }

  onAddConfirmed() {
    this.todoAdded.emit({
      id: null,
      title: this.newTodoTitle,
      description: null,
      dueDate: null,
      isDone: this.newTodoIsDone,
    });
    this.resetLocalState();
  }

  onCheckedChange(todo: TodoModel, event: CheckboxCustomEvent) {
    this.checkedChange.emit({ ...todo, isDone: event.detail.checked });
  }

  async onTodoDeleted(todo: TodoModel, sliding: IonItemSliding) {
    await sliding.close();
    this.todoDeleted.emit(todo);
  }

  private resetLocalState() {
    this.$isDrafting.set(false);
    this.newTodoTitle = '';
    this.newTodoIsDone = false;
  }
}
