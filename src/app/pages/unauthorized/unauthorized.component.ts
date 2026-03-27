import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        <div class="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-amber-100 mb-6">
          <svg class="h-12 w-12 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p class="mt-2 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Acceso restringido</p>
        <p class="mt-4 text-lg text-gray-500">
          No tienes los permisos necesarios para visualizar este contenido o realizar esta acción.
        </p>
        <div class="mt-8 flex justify-center gap-4">
          <button (click)="goBack()" class="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm">
            Volver atrás
          </button>
        </div>
      </div>
    </div>
  `
})
export class UnauthorizedComponent {
  constructor(private location: Location) {}
  
  goBack(): void {
    this.location.back();
  }
}
