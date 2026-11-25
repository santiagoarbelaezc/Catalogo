import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoriesService } from '../../../services/categories.service';
import { ProductsService } from '../../../services/products.service';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

export interface CategoryTreeNode {
  id: number;
  name: string;
  brand: string;
  created_at?: string;
  subcategories: any[];
  products: any[];
  visibleProductsCount: number;
  totalProductsCount: number;
  expanded?: boolean;
}

@Component({
  selector: 'app-dashboard-category-tree',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-category-tree.component.html',
  styleUrls: [
    '../dashboard-categories/dashboard-categories.component.css',
    './dashboard-category-tree.component.css'
  ]
})
export class DashboardCategoryTreeComponent implements OnInit {
  // Sidebar & Navigation
  sidebarExpanded = true;
  sectionsDropdownOpen = true;

  // Data
  allNodes: CategoryTreeNode[] = [];
  isLoading = false;
  loadError = false;

  // Filters
  selectedBrand = ''; // '', 'Plaxtilineas', 'Espumas', 'Districol', 'Camascotas'
  searchQuery = '';
  sortBy: 'az' | 'za' | 'sub_desc' | 'prod_desc' = 'az';
  onlyWithProducts = false;
  onlyWithSubcategories = false;
  viewMode: 'cards' | 'tree' = 'cards';

  // Pagination
  currentPage = 1;
  itemsPerPage = 12;

  // Detail Modal
  selectedNode: CategoryTreeNode | null = null;

  readonly brandTabs = [
    { key: '', label: 'Todas las Líneas' },
    { key: 'Plaxtilineas', label: 'Plaxtilineas' },
    { key: 'Espumas', label: 'Espumas' },
    { key: 'Districol', label: 'Districol' },
    { key: 'Camascotas', label: 'Camascotas' }
  ];

  constructor(
    private categoriesService: CategoriesService,
    private productsService: ProductsService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTreeData();
  }

  loadTreeData(): void {
    this.isLoading = true;
    this.loadError = false;
    this.cdr.markForCheck();

    forkJoin({
      catRes: this.categoriesService.getCategories(),
      products: this.productsService.getAllProducts()
    }).subscribe({
      next: ({ catRes, products }) => {
        const rawCategories: any[] = Array.isArray(catRes)
          ? catRes
          : (catRes?.data || []);
        const allProducts: any[] = Array.isArray(products) ? products : [];

        this.allNodes = rawCategories.map(cat => {
          const catId = Number(cat.id);
          const catBrand = this.normalizeBrand(cat.brand);
          const catProducts = allProducts.filter(p => Number(p.category_id) === catId);
          const visibleCount = catProducts.filter(p => this.productsService.hasValidPrice(p)).length;
          const subcats = Array.isArray(cat.subcategories) ? cat.subcategories : [];

          return {
            id: catId,
            name: cat.name || 'Sin nombre',
            brand: catBrand,
            created_at: cat.created_at,
            subcategories: subcats,
            products: catProducts,
            visibleProductsCount: visibleCount,
            totalProductsCount: catProducts.length,
            expanded: false
          };
        });

        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error cargando árbol de categorías:', err);
        this.isLoading = false;
        this.loadError = true;
        this.toastService.error('No se pudo cargar el árbol de categorías');
        this.cdr.markForCheck();
      }
    });
  }

  private normalizeBrand(brand: string | undefined): string {
    if (!brand) return 'Plaxtilineas';
    const b = brand.trim().toLowerCase();
    if (b.includes('espuma')) return 'Espumas';
    if (b.includes('districol')) return 'Districol';
    if (b.includes('camascota')) return 'Camascotas';
    return 'Plaxtilineas';
  }

  getBrandCount(brandKey: string): number {
    if (!brandKey) return this.allNodes.length;
    return this.allNodes.filter(n => n.brand === brandKey).length;
  }

  get totalMatchingBrandCount(): number {
    return this.getBrandCount(this.selectedBrand);
  }

  get filteredNodes(): CategoryTreeNode[] {
    let result = [...this.allNodes];

    if (this.selectedBrand) {
      result = result.filter(n => n.brand === this.selectedBrand);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.trim().toLowerCase();
      result = result.filter(n =>
        n.name.toLowerCase().includes(q) ||
        n.brand.toLowerCase().includes(q) ||
        n.subcategories.some((s: any) => (s.name || '').toLowerCase().includes(q))
      );
    }

    if (this.onlyWithProducts) {
      result = result.filter(n => n.totalProductsCount > 0);
    }

    if (this.onlyWithSubcategories) {
      result = result.filter(n => n.subcategories.length > 0);
    }

    result.sort((a, b) => {
      switch (this.sortBy) {
        case 'za':
          return b.name.localeCompare(a.name);
        case 'sub_desc':
          return b.subcategories.length - a.subcategories.length || a.name.localeCompare(b.name);
        case 'prod_desc':
          return b.totalProductsCount - a.totalProductsCount || a.name.localeCompare(b.name);
        case 'az':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return result;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredNodes.length / this.itemsPerPage));
  }

  get paginatedNodes(): CategoryTreeNode[] {
    const safePage = Math.min(this.currentPage, this.totalPages);
    const start = (safePage - 1) * this.itemsPerPage;
    return this.filteredNodes.slice(start, start + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.markForCheck();
    }
  }

  prevPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  resetPage(): void {
    this.currentPage = 1;
  }

  selectBrand(brandKey: string): void {
    this.selectedBrand = brandKey;
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  toggleNodeExpand(node: CategoryTreeNode, event?: Event): void {
    event?.stopPropagation();
    node.expanded = !node.expanded;
    this.cdr.markForCheck();
  }

  openDetailModal(node: CategoryTreeNode, event?: Event): void {
    event?.stopPropagation();
    this.selectedNode = node;
    this.cdr.markForCheck();
  }

  closeDetailModal(): void {
    this.selectedNode = null;
    this.cdr.markForCheck();
  }

  goToInventory(node: CategoryTreeNode, event?: Event): void {
    event?.stopPropagation();
    this.router.navigate(['/dashboard/productos'], {
      queryParams: {
        brand: node.brand,
        category: node.name
      }
    });
  }

  getSubcategoryProductCount(node: CategoryTreeNode, subId: number): number {
    return node.products.filter(p => Number(p.subcategory_id) === Number(subId)).length;
  }

  getProductMinPrice(product: any): number {
    return this.productsService.getProductMinPrice(product);
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Sin registro';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return 'Sin registro';
    return d.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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

  navigateToCamascotas(): void {
    this.router.navigate(['/dashboard/camascotas']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

