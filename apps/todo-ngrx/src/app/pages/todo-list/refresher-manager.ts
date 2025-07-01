import { effect, Signal, signal } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

export class RefresherManager {
  private readonly refresherEvent = signal<RefresherCustomEvent | null>(null);

  constructor(private readonly $isLoading: Signal<boolean>) {
    effect(() => {
      if (!this.$isLoading() && this.refresherEvent()) {
        void this.refresherEvent()?.target.complete();
        this.refresherEvent.set(null);
      }
    });
  }

  get isRefreshing(): boolean {
    return this.refresherEvent() !== null;
  }

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherEvent.set(event);
  }
}
