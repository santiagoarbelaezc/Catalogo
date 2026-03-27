import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full text-center">
        <h1 class="text-9xl font-extrabold text-blue-600 tracking-tight">404</h1>
        <p class="mt-4 text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Página no encontrada</p>
        <p class="mt-4 text-lg text-gray-500">
          La página que buscas no existe, ha sido eliminada o fue movida a otra dirección.
        </p>
        <div class="mt-10">
          <a routerLink="/" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm">
            <svg class="mr-2 -ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  `
})
export class NotFoundComponent {}
