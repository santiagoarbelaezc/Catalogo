import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';

import { CatalogDataService } from '../../services/catalog-data.service';
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

import { CatalogFilterBarComponent, CatalogFilters } from '../../components/catalog/catalog-filter-bar/catalog-filter-bar.component';

@Component({
  selector: 'app-plaxtilineas',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, NavbarComponent, CatalogFilterBarComponent],
  templateUrl: './plaxtilineas.component.html',
  styleUrl: './plaxtilineas.component.css'
})
export class PlaxtilineasComponent implements OnInit {
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
  itemsPerPage: number = 12;

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
    this.currentPage = 1;

    let result = [...this.products];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        (p.description && p.description.toLowerCase().includes(query))
      );
    }

    if (filters.minPrice !== null) {
      result = result.filter(p => this.getProductMinPrice(p) >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== null) {
      result = result.filter(p => this.getProductMinPrice(p) <= (filters.maxPrice ?? Infinity));
    }

    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return this.getProductMinPrice(a) - this.getProductMinPrice(b);
        case 'price-desc': return this.getProductMinPrice(b) - this.getProductMinPrice(a);
        default: return 0;
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
      // Hacer scroll suave hacia el inicio de la sección de productos
      const element = document.getElementById('plaxtilineas-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  constructor(
    private catalogDataService: CatalogDataService,
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.products = this.catalogDataService.getPlaxtilineasProducts();
    
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          this.products = products
            .filter((product: any) => product.category === 'Plaxtilineas')
            .sort((a, b) => a.name.localeCompare(b.name));
          this.applyFilters(this.currentFilters);
        }
      },
      error: (error) => {
        console.error('Error cargando productos Plaxtilineas:', error);
      }
    });
  }

  goToPrint(): void {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/catalogo-print'], { queryParams: { brand: 'Plaxtilineas' } })
    );
    window.open(url, '_blank');
  }
}
