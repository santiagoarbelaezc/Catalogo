import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-inicio.component.html',
  styleUrl: './dashboard-inicio.component.css'
})
export class DashboardInicioComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isLoading = true;
  today: Date = new Date();
  stats = {
    totalProducts: 0,
    categories: 0
  };
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadDashboardData() {
    this.isLoading = true;

    // Cargar productos para estadísticas
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

    // Contar categorías únicas
    const categories = new Set(products.map(p => p.category));
    this.stats.categories = categories.size;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en logout:', error);
        // Forzar logout en frontend
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }

  navigateToProducts() {
    this.router.navigate(['/dashboard/productos']);
  }

  navigateToCategories() {
    this.router.navigate(['/dashboard/categorias']);
  }

  navigateToEspumas() {
    this.router.navigate(['/dashboard/espumas']);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
