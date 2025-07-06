import { Injectable, signal } from '@angular/core';
import {
  CategoryModel,
  CategoryViewModel,
  ICategoryFacade,
} from '@todo-angular-architecture/todo';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade implements ICategoryFacade {
  $categories = signal({ categories: [] } as CategoryViewModel);
  $isLoading = signal(false);

  constructor() {
    // FIXME: mock implementation
    this.$isLoading.set(true);
    setTimeout(() => {
      this.$categories.set({
        categories: [
          { id: 1, title: 'Work', description: 'Tasks related to work' },
          {
            id: 2,
            title: 'Personal',
            description: 'Personal to-dos and errands',
          },
          { id: 3, title: 'Shopping', description: 'Shopping list items' },
          {
            id: 4,
            title: 'Health',
            description: 'Exercise and wellness goals',
          },
          {
            id: 5,
            title: 'Finance',
            description: 'Budgeting and financial tasks',
          },
          { id: 6, title: 'Travel', description: 'Trip planning and bookings' },
          { id: 7, title: 'Home', description: 'Household chores and repairs' },
          {
            id: 8,
            title: 'Learning',
            description: 'Courses and reading lists',
          },
          {
            id: 9,
            title: 'Social',
            description: 'Meetups and calls with friends',
          },
          { id: 10, title: 'Other', description: null },
          {
            id: 11,
            title: 'Fitness',
            description: 'Workout and training plans',
          },
          {
            id: 12,
            title: 'Career',
            description: 'Job search and career goals',
          },
          {
            id: 13,
            title: 'Pets',
            description: 'Pet care tasks and vet visits',
          },
          {
            id: 14,
            title: 'Kids',
            description: 'Parenting and children’s activities',
          },
          {
            id: 15,
            title: 'Events',
            description: 'Event planning and invitations',
          },
          {
            id: 16,
            title: 'Volunteer',
            description: 'Community service and giving back',
          },
          {
            id: 17,
            title: 'Reading',
            description: 'Books and articles to read',
          },
          {
            id: 18,
            title: 'Writing',
            description: 'Blog posts and writing tasks',
          },
          {
            id: 19,
            title: 'Cleaning',
            description: 'Household cleaning tasks',
          },
          { id: 20, title: 'Gardening', description: 'Garden and plant care' },
          {
            id: 21,
            title: 'Meal Prep',
            description: 'Meal planning and recipes',
          },
          {
            id: 22,
            title: 'Technology',
            description: 'Device setup and troubleshooting',
          },
          {
            id: 23,
            title: 'Entertainment',
            description: 'Movies and shows to watch',
          },
          { id: 24, title: 'Goals', description: 'Short- and long-term goals' },
          { id: 25, title: 'Inbox', description: null },
        ],
      });
      this.$isLoading.set(false);
    }, 1000);
  }

  resetCategoriesState(): void {
    throw new Error('Method not implemented.');
  }
  addCategory(category: CategoryModel): void {
    throw new Error('Method not implemented.');
  }
  fetchCategories(): void {
    throw new Error('Method not implemented.');
  }
  getCategory(id: number): void {
    throw new Error('Method not implemented.');
  }
  updateCategory(category: CategoryModel): void {
    throw new Error('Method not implemented.');
  }
  deleteCategory(id: number): void {
    throw new Error('Method not implemented.');
  }
}
