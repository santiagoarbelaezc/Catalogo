import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-inicio.component.html',
  styleUrl: './dashboard-inicio.component.css'
})
export class DashboardInicioComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isLoading = true;
  today: Date = new Date();
  sidebarExpanded = true;

  stats = {
    totalProducts: 0,
    categories: 0
  };

  sectionsDropdownOpen = true;

  toggleSectionsDropdown() {
    if (!this.sidebarExpanded) {
      this.sidebarExpanded = true;
      this.sectionsDropdownOpen = true;
      return;
    }
    this.sectionsDropdownOpen = !this.sectionsDropdownOpen;
  }

  get displayName(): string {
    return 'Mateo Moreno';
  }

  get formattedDate(): string {
    const weekday = this.today.toLocaleDateString('en-US', { weekday: 'long' });
    const day = this.today.getDate();
    const month = this.today.toLocaleDateString('en-US', { month: 'long' });
    const year = this.today.getFullYear();
    return `${weekday}, ${day} ${month} ${year}`;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();

    // Colapsar sidebar en pantallas pequeñas al inicio
    if (window.innerWidth < 1024) {
      this.sidebarExpanded = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 1024) {
      this.sidebarExpanded = false;
    }
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  private loadDashboardData() {
    this.isLoading = true;

    const productsSub = this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          this.calculateStats(products);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.isLoading = false;
      }
    });

    this.subscriptions.push(productsSub);
  }

  private calculateStats(products: any[]) {
    this.stats.totalProducts = products.length;
    const categories = new Set(products.map(p => p.category));
    this.stats.categories = categories.size;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateToProducts()    { this.router.navigate(['/dashboard/productos']); }
  navigateToCategories()  { this.router.navigate(['/dashboard/categorias']); }
  navigateToEspumas()     { this.router.navigate(['/dashboard/espumas']); }
  navigateToDistricol()   { this.router.navigate(['/dashboard/districol']); }
  openWebCatalog()        { window.open('/catalogo', '_blank'); }

  /** Iniciales del usuario para el avatar */
  get userInitials(): string {
    return 'MM';
  }

  /** Saludo según la hora */
  get greeting(): string {
    const h = new Date().getHours();
    if (h < 12) return 'Buenos días';
    if (h < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }
}
