import { Injectable } from '@angular/core';
import { GenericHttpService } from '@todo-angular-architecture/generic-http';
import { CategoryDto, CategoryModel } from '../model/category.interfaces';
import { CategoryAdapter } from '../adapters/category.adapter';

@Injectable({
  providedIn: 'root',
})
export class CategoryHttpService extends GenericHttpService<
  CategoryDto,
  CategoryModel
> {
  constructor() {
    super('/categories', '', new CategoryAdapter());
  }
}
