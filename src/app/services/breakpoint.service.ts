import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private currentBreakpoint = new BehaviorSubject<Breakpoint>('desktop');

  constructor() {
    this.updateBreakpoint();
    window.addEventListener('resize', () => this.updateBreakpoint());
  }

  private updateBreakpoint(): void {
    const width = window.innerWidth;
    let breakpoint: Breakpoint;

    if (width < 768) {
      breakpoint = 'mobile';
    } else if (width < 1024) {
      breakpoint = 'tablet';
    } else {
      breakpoint = 'desktop';
    }

    this.currentBreakpoint.next(breakpoint);
  }

  getBreakpoint() {
    return this.currentBreakpoint.asObservable();
  }

  getCurrentBreakpoint(): Breakpoint {
    return this.currentBreakpoint.value;
  }
}