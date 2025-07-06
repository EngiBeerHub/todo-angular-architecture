import { computed, effect, Signal, signal } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';

export class RefresherManager {
  $isRefreshing = computed(() => {
    return this.refresherEvent() !== null;
  });
  private readonly refresherEvent = signal<RefresherCustomEvent | null>(null);

  constructor(
    // when finish loading, finish refresh
    private readonly $isLoading: Signal<boolean>
  ) {
    effect(() => {
      if (!this.$isLoading() && this.refresherEvent()) {
        void this.refresherEvent()?.target.complete();
        this.refresherEvent.set(null);
      }
    });
  }

  onRefreshed(event: RefresherCustomEvent) {
    this.refresherEvent.set(event);
  }
}
