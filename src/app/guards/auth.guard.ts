import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  const token = localStorage.getItem('auth_token');

  if (!token) {
    toast.warning('Debes iniciar sesión para acceder a esta sección.');
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const payload = JSON.parse(jsonPayload);
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('current_user');
      toast.warning('Tu sesión expiró. Inicia sesión nuevamente.');
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  } catch {
    localStorage.removeItem('auth_token');
    router.navigate(['/login']);
    return false;
  }

  return true;
};