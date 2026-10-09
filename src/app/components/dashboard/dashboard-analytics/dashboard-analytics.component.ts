import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService, Category } from '../../../services/categories.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard-analytics',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective, RouterModule],
  templateUrl: './dashboard-analytics.component.html',
  styleUrl: './dashboard-analytics.component.css'
})
export class DashboardAnalyticsComponent implements OnInit {
  sidebarExpanded = true;
  sectionsDropdownOpen = false;

  products: any[] = [];
  categories: Category[] = [];
  isLoading = false;
  loadingError = false;

  // Tabs: 0 = Resumen, 1 = Calidad, 2 = Por Categoría
  reportTab: number = 0;
  reportLineFilter: string = '';
  reportCategoryFilter: string = '';
  activeActionCard: 'description' | 'images' | 'variants' | 'price' | null = null;
  problemProducts: any[] = [];

  statsGlobal: any = {
    total: 0,
    plaxtilineas: 0,
    espumas: 0,
    districol: 0,
    otros: 0,
    missingDescription: 0,
    missingImages: 0,
    missingPrice: 0,
    missingVariants: 0,
    complete: 0,
    completePct: 0
  };

  // Charts
  // ── Charts: Monochromatic with Red, Gray & Black ──
  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { family: 'Inter Tight', size: 12, weight: '700' },
          color: '#09090b',
          padding: 18,
          usePointStyle: true,
          pointStyleWidth: 10
        }
      },
      tooltip: {
        backgroundColor: '#09090b',
        titleFont: { family: 'Inter Tight', size: 13, weight: '700' },
        titleColor: '#ffffff',
        bodyFont: { family: 'Inter Tight', size: 12, weight: '600' },
        bodyColor: '#e4e4e7',
        borderColor: '#27272a',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        boxPadding: 6,
        callbacks: {
          label: (context: any) => {
            const val = context.raw || 0;
            const dataset = context.chart?.data?.datasets?.[0];
            const dataArr = dataset ? dataset.data : [];
            const total = dataArr.reduce((a: number, b: number) => a + b, 0);
            const pct = total > 0 ? Math.round((val / total) * 100) : 0;
            return ` ${context.label}: ${val} (${pct}%)`;
          }
        }
      }
    },
    cutout: '72%'
  };
  public lineChartType: ChartType = 'doughnut';
  public lineChartData: ChartData<'doughnut'> = {
    labels: ['Plaxtilineas', 'Espumas', 'Districol', 'Otros'],
    datasets: [
      {
        data: [0, 0, 0, 0],
        backgroundColor: ['#dc2626', '#09090b', '#52525b', '#a1a1aa'],
        hoverBackgroundColor: ['#b91c1c', '#000000', '#3f3f46', '#71717a'],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 10
      }
    ]
  };

  public categoryChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#09090b',
        titleFont: { family: 'Inter Tight', size: 13, weight: '700' },
        titleColor: '#ffffff',
        bodyFont: { family: 'Inter Tight', size: 12, weight: '600' },
        bodyColor: '#e4e4e7',
        borderColor: '#27272a',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => ` ${context.raw} productos registrados`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: '#f4f4f5' },
        ticks: { font: { family: 'Inter Tight', size: 11, weight: '600' }, color: '#71717a', precision: 0 }
      },
      y: {
        grid: { display: false },
        ticks: { font: { family: 'Inter Tight', size: 12, weight: '700' }, color: '#09090b' }
      }
    }
  };
  public categoryChartType: ChartType = 'bar';
  public categoryChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        borderRadius: 8,
        barPercentage: 0.65
      }
    ]
  };

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    if (window.innerWidth < 1024) {
      this.sidebarExpanded = false;
    }

    this.loadData();
  }

  // Sidebar Controls
  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.cdr.markForCheck();
  }

  toggleSectionsDropdown(): void {
    if (!this.sidebarExpanded) {
      this.sidebarExpanded = true;
      this.sectionsDropdownOpen = true;
      this.cdr.markForCheck();
      return;
    }
    this.sectionsDropdownOpen = !this.sectionsDropdownOpen;
    this.cdr.markForCheck();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToProducts(): void {
    this.router.navigate(['/dashboard/productos']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/dashboard/analiticas']);
  }

  navigateToCategories(): void {
    this.router.navigate(['/dashboard/categorias']);
  }

  navigateToEspumas(): void {
    this.router.navigate(['/dashboard/espumas']);
  }

  navigateToDistricol(): void {
    this.router.navigate(['/dashboard/districol']);
  }

  openWebCatalog(): void {
    window.open('/catalogo', '_blank');
  }

  logout(): void {
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

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 1024) {
      this.sidebarExpanded = false;
      this.cdr.markForCheck();
    }
  }

  // Data Loading
  loadData(): void {
    this.isLoading = true;
    this.loadingError = false;

    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = Array.isArray(data) ? data : (data?.data ?? []);
        this.calculateStats();
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error('Error cargando analíticas:', err);
        this.loadingError = true;
        this.isLoading = false;
        this.toastService.error('Error al cargar datos analíticos.');
        this.cdr.markForCheck();
      }
    });
  }

  calculateStats(): void {
    let missingDesc = 0, missingImg = 0, missingPrice = 0, missingVars = 0;
    let plaxti = 0, espumas = 0, distri = 0, otros = 0;
    let complete = 0;
    const catCounts: { [key: string]: number } = {};

    this.products.forEach(p => {
      const hasDesc = !!(p.description && p.description.trim() !== '');
      const hasImg = !!(p.images && p.images.length > 0);
      const hasVars = !!(p.variants && p.variants.length > 0);
      const hasPrice = hasVars && !p.variants.some((v: any) => !v.price || v.price <= 0);

      if (!hasDesc) missingDesc++;
      if (!hasImg) missingImg++;
      if (!hasVars) missingVars++;
      else if (!hasPrice) missingPrice++;
      if (hasDesc && hasImg && hasVars && hasPrice) complete++;

      const cat = p.category ? p.category.trim() : '';
      if (cat === 'Plaxtilineas') plaxti++;
      else if (cat === 'Espumas') espumas++;
      else if (cat === 'Districol') distri++;
      else otros++;

      const catName = p.category_name || 'Sin Categoría';
      catCounts[catName] = (catCounts[catName] || 0) + 1;
    });

    const total = this.products.length;
    this.statsGlobal = {
      total,
      plaxtilineas: plaxti,
      espumas,
      districol: distri,
      otros,
      missingDescription: missingDesc,
      missingImages: missingImg,
      missingPrice,
      missingVariants: missingVars,
      complete,
      completePct: total > 0 ? Math.round((complete / total) * 100) : 0
    };

    // Actualizar Gráficos (Monocromático: Rojo, Gris, Negro)
    this.lineChartData = {
      labels: ['Plaxtilineas', 'Espumas', 'Districol', 'Otros'],
      datasets: [
        {
          data: [plaxti, espumas, distri, otros],
          backgroundColor: ['#dc2626', '#09090b', '#52525b', '#a1a1aa'],
          hoverBackgroundColor: ['#b91c1c', '#000000', '#3f3f46', '#71717a'],
          borderColor: '#ffffff',
          borderWidth: 3,
          hoverOffset: 10
        }
      ]
    };

    const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    const barColors = sortedCats.map((_, index) => {
      if (index === 0) return '#dc2626'; // #1 en Rojo vibrante
      if (index === 1) return '#09090b'; // #2 en Negro puro
      if (index === 2) return '#18181b'; // #3 en Carbón profundo
      if (index === 3) return '#27272a'; // #4 en Grafito oscuro
      if (index === 4) return '#3f3f46'; // #5 en Grafito medio
      if (index === 5) return '#52525b'; // #6 en Gris zinc
      if (index === 6) return '#71717a'; // #7 en Gris pizarra
      return '#a1a1aa';                  // Resto en Gris suave
    });

    this.categoryChartData = {
      labels: sortedCats.map(c => c[0]),
      datasets: [
        {
          data: sortedCats.map(c => c[1]),
          backgroundColor: barColors,
          hoverBackgroundColor: barColors.map(c => c === '#dc2626' ? '#b91c1c' : '#000000'),
          borderRadius: 8,
          barPercentage: 0.65
        }
      ]
    };
  }

  // Calidad Tab
  selectActionCard(type: 'description' | 'images' | 'variants' | 'price'): void {
    if (this.activeActionCard === type) {
      this.activeActionCard = null;
      this.problemProducts = [];
      this.cdr.markForCheck();
      return;
    }
    this.activeActionCard = type;
    const src = this.reportLineFilter
      ? this.products.filter(p => p.category?.trim() === this.reportLineFilter)
      : this.products;
    this.problemProducts = src.filter(p => {
      if (type === 'description') return !p.description || p.description.trim() === '';
      if (type === 'images') return !p.images || p.images.length === 0;
      if (type === 'variants') return !p.variants || p.variants.length === 0;
      if (type === 'price') return p.variants && p.variants.length > 0 && p.variants.some((v: any) => !v.price || v.price <= 0);
      return false;
    });
    this.cdr.markForCheck();
  }

  onReportLineFilterChange(): void {
    this.activeActionCard = null;
    this.problemProducts = [];
    this.cdr.markForCheck();
  }

  get filteredLineStats(): any {
    const src = this.reportLineFilter
      ? this.products.filter(p => p.category?.trim() === this.reportLineFilter)
      : this.products;
    let missingDesc = 0, missingImg = 0, missingVars = 0, missingPrice = 0;
    src.forEach(p => {
      if (!p.description || p.description.trim() === '') missingDesc++;
      if (!p.images || p.images.length === 0) missingImg++;
      if (!p.variants || p.variants.length === 0) missingVars++;
      else if (p.variants.some((v: any) => !v.price || v.price <= 0)) missingPrice++;
    });
    return { total: src.length, missingDesc, missingImg, missingVars, missingPrice };
  }

  // Por Categoría Tab
  get uniqueCategoryNames(): string[] {
    const names = new Set<string>();
    this.products.forEach(p => { if (p.category_name) names.add(p.category_name); });
    return Array.from(names).sort();
  }

  get categoryAnalysisProducts(): any[] {
    if (!this.reportCategoryFilter) return [];
    return this.products.filter(p => p.category_name === this.reportCategoryFilter);
  }

  getCategoryCount(type: 'images' | 'description' | 'variants' | 'price'): number {
    return this.categoryAnalysisProducts.filter(p => {
      if (type === 'images') return p.images && p.images.length > 0;
      if (type === 'description') return p.description && p.description.trim() !== '';
      if (type === 'variants') return p.variants && p.variants.length > 0;
      if (type === 'price') return p.variants && p.variants.length > 0 && !p.variants.some((v: any) => !v.price || v.price <= 0);
      return false;
    }).length;
  }

  hasValidPrice(p: any): boolean {
    return !!(p.variants && p.variants.length > 0 && !p.variants.some((v: any) => !v.price || v.price <= 0));
  }

  goToInventory(): void {
    this.router.navigate(['/dashboard/productos']);
  }

  trackByProductId(index: number, p: any): any {
    return p.id || index;
  }
}
