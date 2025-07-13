import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TodoListComponent,
  TodolistMenuContent,
} from '@todo-angular-architecture/components';
import {
  AlertController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLoading,
  IonPopover,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TodoModel } from '@todo-angular-architecture/todo';
import { TodoFacade } from '../../data-access/todo/facades/todo.facade';
import { RefresherCustomEvent } from '@ionic/angular';
import { RefresherManager } from '../../utils/refresher-manager';

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
    IonBackButton,
    IonPopover,
    TodolistMenuContent,
  ],
  templateUrl: './todo-list.html',
  styles: ``,
})
export class TodoListPage {
  // dependencies
  protected readonly todoFacade = inject(TodoFacade);
  private readonly refresherManager = new RefresherManager(
    this.todoFacade.$isLoading
  );
  private readonly alertCtrl = inject(AlertController);

  // view state
  protected $todosViewModel = this.todoFacade.$todosViewModel;
  protected $isDrafting = signal(false);
  protected $isUpdating = signal(false);
  protected $showLoading = computed(() => {
    // not show when pull to refresh
    return (
      this.todoFacade.$isLoading() && !this.refresherManager.$isRefreshing()
    );
  });
  protected readonly $isOpenPopover = signal(false);

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherManager.onRefreshed(event);
    this.todoFacade.fetchTodos();
  }

  onCompleteClicked() {
    this.$isDrafting.set(false);
    this.$isUpdating.set(false);
  }

  onTodoAdded(todo: TodoModel) {
    this.todoFacade.addTodo(todo);
    this.$isDrafting.set(false);
  }

  onCheckedChange(todo: TodoModel) {
    this.todoFacade.updateTodo(todo);
  }

  onTodoUpdated(todo: TodoModel) {
    this.todoFacade.updateTodo(todo);
  }

  onTodoDeleted(todo: TodoModel) {
    this.todoFacade.deleteTodo(todo.id);
  }

  onHideDoneTodosClicked() {
    this.todoFacade.hideDoneTodos();
  }

  onShowDoneTodosClicked() {
    this.todoFacade.showDoneTodos();
  }

  async onDeleteCategoryClicked() {
    const alert = await this.alertCtrl.create({
      header: `"${
        this.$todosViewModel().categoryName
      }"のリストを削除しますか？`,
      message:
        'この操作によりこのリストにあるリマインダーがすべて削除されます。',
      buttons: [
        { text: 'キャンセル', role: 'cancel' },
        {
          text: '削除',
          role: 'destructive',
          handler: () => this.todoFacade.deleteCategoryFromTodoList(),
        },
      ],
    });
    await alert.present();
  }
}
