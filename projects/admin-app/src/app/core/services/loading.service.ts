import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private readonly loadingCounter = signal(0);

  public readonly isLoading = computed(() => this.loadingCounter() > 0);

  public start(): void {
    this.loadingCounter.update((count) => count + 1);
  }

  public stop(): void {
    this.loadingCounter.update((count) => (count > 0 ? count - 1 : 0));
  }
  
}
