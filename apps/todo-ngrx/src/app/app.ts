import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { TodoFacade } from './data-access/todo/facades/todo.facade';

@Component({
  imports: [RouterModule, IonRouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  private readonly todoFacade = inject(TodoFacade);

  constructor() {
    addIcons({ addCircle });
  }

  ngOnInit() {
    this.todoFacade.fetchTodos();
  }
}
