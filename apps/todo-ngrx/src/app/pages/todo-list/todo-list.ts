import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from '@todo-angular-architecture/components';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TodoModel, TodosViewModel } from '@todo-angular-architecture/todo';
import { TodoFacade } from '../../data-access/todo/facades/todo.facade';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';
import { RefresherCustomEvent } from '@ionic/angular';
import { RefresherManager } from './refresher-manager';

@Component({
  imports: [
    CommonModule,
    TodoListComponent,
    IonContent,
    IonLoading,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFooter,
    IonButton,
    IonButtons,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
  ],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListPage implements OnInit {
  // dependencies
  protected readonly todoFacade = inject(TodoFacade);
  private readonly refresherManager = new RefresherManager(
    this.todoFacade.$isLoading
  );

  // view state
  protected $todos: Signal<TodosViewModel> = this.todoFacade.$todos;
  protected $isDrafting = signal(false);
  private $_isLoading = this.todoFacade.$isLoading;
  protected $showLoading = computed(() => {
    // not show when pull to refresh
    return this.$_isLoading() && !this.refresherManager.isRefreshing;
  });

  constructor() {
    addIcons({ addCircle });
  }

  ngOnInit() {
    this.todoFacade.fetchTodos();
  }

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherManager.onRefreshed(event);
    this.todoFacade.fetchTodos();
  }

  onTodoAdded(todo: TodoModel) {
    if (todo.title) {
      this.todoFacade.addTodo(todo);
    }
    this.$isDrafting.set(false);
  }

  onCheckedChange(event: TodoModel) {
    this.todoFacade.updateTodo(event);
  }

  onTodoDeleted(event: TodoModel) {
    if (event.id) {
      this.todoFacade.deleteTodo(event.id);
    }
  }
}
