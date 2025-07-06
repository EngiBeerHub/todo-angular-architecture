import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'lib-category-list',
  imports: [CommonModule, IonList],
  templateUrl: './category-list.html',
  styleUrl: './category-list.scss',
})
export class CategoryListComponent {}
