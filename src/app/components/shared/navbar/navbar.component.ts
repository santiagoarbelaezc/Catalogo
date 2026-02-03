import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapMarkerAlt, faPhone, faStore, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isVisible = true;
  previousScrollY = 0;
  isMobileMenuOpen = false;

  // Font Awesome icons
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faStore = faStore;
  faBars = faBars;
  faTimes = faTimes;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

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
    const currentScroll = window.scrollY;
    // Si estamos en el top de la página, mostrar navbar
    if (currentScroll === 0) {
      this.isVisible = true;
    } else if (currentScroll > this.previousScrollY) {
      // Scrolling down, hide navbar
      this.isVisible = false;
    } else if (currentScroll < this.previousScrollY) {
      // Scrolling up, show navbar
      this.isVisible = true;
    }
    this.previousScrollY = currentScroll;
  }
}
