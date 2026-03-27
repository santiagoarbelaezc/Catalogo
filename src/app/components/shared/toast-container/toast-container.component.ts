import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { ToastItemComponent } from './toast-item.component';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [ToastItemComponent],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <app-toast-item 
          [toast]="toast" 
          (dismissed)="toastService.dismiss($event)"
        />
      }
    </div>
  `
})
export class ToastContainerComponent {
  public toastService = inject(ToastService);
}
