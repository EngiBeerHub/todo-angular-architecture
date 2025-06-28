import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  imports: [CommonModule, IonList, IonContent, IonItem, IonLabel],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
})
export class TodoList {}
