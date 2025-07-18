import { ModelAdapter } from '@todo-angular-architecture/generic-http';
import { CategoryDto, CategoryModel } from '../model/category.interfaces';

export class CategoryAdapter
  implements ModelAdapter<CategoryDto, CategoryModel>
{
  fromDto(dto: CategoryDto): CategoryModel {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      showDoneTodos: dto.showDoneTodos,
    };
  }

  toDto(model: CategoryModel): CategoryDto {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      showDoneTodos: model.showDoneTodos,
    };
  }
}
