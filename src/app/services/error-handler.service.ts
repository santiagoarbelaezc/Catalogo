import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private toast = inject(ToastService);

  handle(error: HttpErrorResponse, context?: string): void {
    if (!environment.production && context) {
      console.error(`[${context}]`, error);
    }
    // El toast ya es manejado globalmente por el interceptor HTTP.
    // Este método sirve como hook opcional si el componente requiere lógica adicional.
  }

  handleLocal(message: string): void {
    this.toast.error(message);
  }

  success(message: string): void {
    this.toast.success(message);
  }
}
