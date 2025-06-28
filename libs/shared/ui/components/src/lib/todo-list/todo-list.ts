import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCheckbox, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'lib-todo-list',
  imports: [CommonModule, IonList, IonItem, IonCheckbox],
  template: `
    <ion-list [inset]="true">
      @for (todo of todos(); track todo) {
      <ion-item>
        <ion-checkbox labelPlacement="end">{{ todo }}</ion-checkbox>
      </ion-item>
      }
    </ion-list>
  `,
  styles: ``,
})
export class TodoListComponent {
  // TODO: change type
  todos = input.required<string[]>();
}
