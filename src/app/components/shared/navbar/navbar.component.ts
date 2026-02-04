import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapMarkerAlt, faPhone, faStore, faBars, faTimes, faPrint } from '@fortawesome/free-solid-svg-icons';
import { PdfService } from '../../../services/pdf.service';

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
  isGeneratingPdf = false;

  // Font Awesome icons
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faStore = faStore;
  faBars = faBars;
  faTimes = faTimes;
  faPrint = faPrint;

  constructor(private pdfService: PdfService) {}

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

  async printCatalog() {
    if (this.isGeneratingPdf) return;

    this.isGeneratingPdf = true;

    try {
      // Mostrar indicador de carga
      const loadingMsg = 'Generando catálogo PDF con diseño completo...';
      console.log(loadingMsg);

      // Deshabilitar scroll temporalmente
      document.body.style.overflow = 'hidden';

      // Navegar a la página del catálogo si no estamos ahí
      const currentUrl = window.location.pathname;
      if (currentUrl !== '/catalogo') {
        console.log('Navegando a la página del catálogo...');
        window.location.href = '/catalogo';
        // Esperar a que la página cargue
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Esperar un poco más para que todo se renderice
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Generar PDF
      await this.pdfService.generateCatalogPdf();

      console.log('✅ PDF generado exitosamente con todo el diseño');

    } catch (error) {
      console.error('❌ Error generando PDF:', error);

      // Mensaje amigable al usuario
      alert('Hubo un problema al generar el PDF.\nSe ha creado una versión básica del catálogo.');

    } finally {
      this.isGeneratingPdf = false;
      document.body.style.overflow = '';
    }
  }
}
