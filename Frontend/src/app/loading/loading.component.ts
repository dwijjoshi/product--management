import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnDestroy {
  isLoading = false;
  private subscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.subscription = this.loadingService.loading$.subscribe((loading) => {
      this.isLoading = loading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
