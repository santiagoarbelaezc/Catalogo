import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly STORAGE_KEY = 'catalogo_theme';
  readonly isDarkMode = signal<boolean>(true);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    const saved = localStorage.getItem(this.STORAGE_KEY);
    // Por defecto siempre tema oscuro si no hay preferencia previa guardada
    const isDark = saved !== null ? saved === 'dark' : true;
    this.applyTheme(isDark);
  }

  toggleTheme(): void {
    this.setDarkMode(!this.isDarkMode());
  }

  setDarkMode(isDark: boolean): void {
    this.applyTheme(isDark);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
    }
  }

  private applyTheme(isDark: boolean): void {
    this.isDarkMode.set(isDark);
    if (typeof document !== 'undefined') {
      document.body.classList.toggle('dark-theme', isDark);
      document.documentElement.classList.toggle('dark-theme', isDark);
    }
  }
}
