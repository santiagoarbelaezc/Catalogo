import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { getErrorMessage } from '../utils/error-messages';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast   = inject(ToastService);
  const router  = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const skipToast = req.headers.has('X-Skip-Error-Toast');
      const isLoginUrl = req.url.includes('/auth/login');
      
      const backendMessage: string | undefined = error.error?.message;
      const backendErrors: string[] | undefined = error.error?.errors;

      const userMessage = getErrorMessage(error.status, backendMessage);

      // Only show toasts if the caller component hasn't opted out and it's not the manual login 401
      if (!skipToast && !(error.status === 401 && isLoginUrl)) {
        if (backendErrors && backendErrors.length > 0) {
          backendErrors.forEach(err => toast.error(err, 7000));
        } else {
          toast.error(userMessage);
        }
      }

      switch (error.status) {
        case 401:
          localStorage.removeItem('auth_token');
          localStorage.removeItem('current_user');
          if (!isLoginUrl) {
            router.navigate(['/login'], { 
              queryParams: { reason: 'session_expired' } 
            });
          }
          break;

        case 403:
          router.navigate(['/unauthorized']);
          break;

        case 0:
          // Sin conexión
          break;
      }

      return throwError(() => error);
    })
  );
};
