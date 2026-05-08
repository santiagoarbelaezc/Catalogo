import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { CatalogItemComponent } from "../../components/catalog/catalog-item/catalog-item.component";
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { Router } from '@angular/router';

import { CatalogFilterBarComponent, CatalogFilters } from '../../components/catalog/catalog-filter-bar/catalog-filter-bar.component';

@Component({
  selector: 'app-catalogo-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CatalogItemComponent, CatalogFilterBarComponent],
  templateUrl: './catalogo-home.component.html',
  styleUrl: './catalogo-home.component.css'
})
export class CatalogoHomeComponent implements OnInit {
  products: CatalogProduct[] = [];
  filteredProducts: CatalogProduct[] = [];
  
  currentFilters: CatalogFilters = {
    minPrice: null,
    maxPrice: null,
    sortBy: 'name-asc',
    searchQuery: ''
  };
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 16; // Mostramos un poco más (16) en el Home

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          // Ordenar por nombre A-Z por defecto
          this.products = products.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          this.applyFilters(this.currentFilters);
        }
      },
      error: (error: any) => {
        console.error('Error cargando catálogo general:', error);
      }
    });
  }

  get paginatedProducts(): CatalogProduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  private getProductMinPrice(product: CatalogProduct): number {
    const variants = product.references || product.variants || [];
    if (variants.length === 0) return 0;
    const prices = variants
      .map(v => v.price)
      .filter((p): p is number => p !== undefined && p !== null);
    return prices.length > 0 ? Math.min(...prices) : 0;
  }

  applyFilters(filters: CatalogFilters): void {
    this.currentFilters = filters;
    this.currentPage = 1; // Reset to first page on filter change

    let result = [...this.products];

    // Filter by Search Query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    // Filter by Price
    if (filters.minPrice !== null) {
      result = result.filter(p => this.getProductMinPrice(p) >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== null) {
      result = result.filter(p => this.getProductMinPrice(p) <= (filters.maxPrice ?? Infinity));
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return this.getProductMinPrice(a) - this.getProductMinPrice(b);
        case 'price-desc':
          return this.getProductMinPrice(b) - this.getProductMinPrice(a);
        default:
          return 0;
      }
    });

    this.filteredProducts = result;
  }

  get pagesList(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const element = document.getElementById('catalogo-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  goToPrint(): void {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/catalogo-print']));
    window.open(url, '_blank');
  }
}
