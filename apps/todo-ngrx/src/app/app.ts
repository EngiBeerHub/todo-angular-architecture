import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HelloWorld } from '@todo-angular-architecture/components';

@Component({
  imports: [RouterModule, HelloWorld],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
