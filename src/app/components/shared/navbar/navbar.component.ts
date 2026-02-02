import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isVisible = true;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // Si estamos en el top de la página, mantener visible
    if (window.scrollY === 0) {
      this.isVisible = true;
      return;
    }
    // Lógica normal del mouse
    this.isVisible = event.clientY < 120;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Si estamos en el top de la página, mostrar navbar
    if (window.scrollY === 0) {
      this.isVisible = true;
    }
  }
}
