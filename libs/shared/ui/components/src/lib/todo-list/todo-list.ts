import { Component, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonCheckbox,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { TodoModel } from '@todo-angular-architecture/todo';
import { CheckboxCustomEvent } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { sleep } from '../utils/sleep';

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
    IonLabel,
  ],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListComponent {
  // input
  $todos = input.required<TodoModel[]>();

  // output
  todoAdded = output<TodoModel>();
  checkedChange = output<TodoModel>();
  todoDeleted = output<TodoModel>();
  todoUpdated = output<TodoModel>();

  // input and output
  $isDrafting = model(false);
  $isUpdating = model(false);

  // add draft value
  $newTodoTitle = model('');
  $newTodoIsDone = model(false);

  // update draft value
  $editingTodoId = signal<number | null>(null);
  $editingTitle = model('');
  $editingTodo = signal<TodoModel | null>(null);

  constructor() {
    addIcons({ trash });
  }

  onAddConfirmed() {
    this.todoAdded.emit({
      id: null,
      categoryId: null,
      title: this.$newTodoTitle(),
      description: null,
      dueDate: null,
      isDone: this.$newTodoIsDone(),
    });
    this.resetLocalState();
  }

  onCheckedChange(todo: TodoModel, event: CheckboxCustomEvent) {
    this.checkedChange.emit({ ...todo, isDone: event.detail.checked });
  }

  onStartEditing(todo: TodoModel) {
    this.$isUpdating.set(true);
    this.$editingTodoId.set(todo.id);
    this.$editingTitle.set(todo.title);
    this.$editingTodo.set(todo);
  }

  onEditConfirmed(todo: TodoModel) {
    if (todo.title !== this.$editingTitle()) {
      this.todoUpdated.emit({ ...todo, title: this.$editingTitle() });
    }
    this.$isUpdating.set(false);
  }

  async onTodoDeleted(todo: TodoModel, sliding: IonItemSliding) {
    await sliding.close();
    await sleep(400);
    this.todoDeleted.emit(todo);
  }

  private resetLocalState() {
    this.$isDrafting.set(false);
    this.$newTodoTitle.set('');
    this.$newTodoIsDone.set(false);
    this.$editingTodoId.set(null);
    this.$editingTitle.set('');
    this.$editingTodo.set(null);
  }
}
