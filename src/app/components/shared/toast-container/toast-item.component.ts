import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from '../../../models/toast.model';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="relative flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-lg text-white overflow-hidden pointer-events-auto transition-all"
      [ngClass]="getBgColor()"
      style="animation: slideInRight 0.3s ease-out forwards;"
    >
      <!-- Icon -->
      <div class="shrink-0 flex items-center justify-center w-6 h-6">
        @switch (toast.type) {
          @case ('success') {
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          }
          @case ('error') {
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          }
          @case ('warning') {
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
          @case ('info') {
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        }
      </div>

      <!-- Message -->
      <div class="flex-1 text-sm font-medium">
        {{ toast.message }}
      </div>

      <!-- Dismiss Button -->
      @if (toast.dismissible !== false) {
        <button 
          (click)="onDismiss()" 
          class="shrink-0 w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors focus:outline-none"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      }

      <!-- Progress bar -->
      @if (toast.duration && toast.duration > 0) {
        <div class="absolute bottom-0 left-0 h-1 bg-white/30"
             [style.animation]="'progressBar ' + toast.duration + 'ms linear forwards'">
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to   { transform: translateX(0);    opacity: 1; }
    }
    @keyframes progressBar {
      from { width: 100%; }
      to   { width: 0%;   }
    }
  `]
})
export class ToastItemComponent {
  @Input({ required: true }) toast!: Toast;
  @Output() dismissed = new EventEmitter<string>();

  getBgColor(): string {
    switch (this.toast.type) {
      case 'success': return 'bg-green-600';
      case 'error':   return 'bg-red-600';
      case 'warning': return 'bg-amber-500';
      case 'info':    return 'bg-blue-600';
      default:        return 'bg-gray-800';
    }
  }

  onDismiss() {
    this.dismissed.emit(this.toast.id);
  }
}
