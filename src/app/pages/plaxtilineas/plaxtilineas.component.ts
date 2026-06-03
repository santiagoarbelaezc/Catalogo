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
  
  // Filtros de categorías
  selectedCategoryId: number | null = null;
  selectedSubcategoryId: number | null = null;
  categoriesList: any[] = [];
  showCategoriesMenu = false;

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

    // Filtrar por categorías y subcategorías (Sidebar)
    if (this.selectedCategoryId !== null) {
      result = result.filter((p: any) => parseInt(p.category_id, 10) === this.selectedCategoryId);
    }
    if (this.selectedSubcategoryId !== null) {
      result = result.filter((p: any) => parseInt(p.subcategory_id, 10) === this.selectedSubcategoryId);
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

  buildCategoryMenu() {
    const catMap = new Map<number, { id: number, name: string, subcategories: Map<number, { id: number, name: string }> }>();
    
    this.products.forEach((p: any) => {
      if (p.category_id) {
        const catId = parseInt(p.category_id, 10);
        const catName = p.category_name || 'Sin Categoría';
        
        if (!catMap.has(catId)) {
          catMap.set(catId, {
            id: catId,
            name: catName,
            subcategories: new Map<number, { id: number, name: string }>()
          });
        }
        
        const catData = catMap.get(catId)!;
        
        if (p.subcategory_id) {
          const subId = parseInt(p.subcategory_id, 10);
          const subName = p.subcategory_name || 'General';
          if (!catData.subcategories.has(subId)) {
            catData.subcategories.set(subId, {
              id: subId,
              name: subName
            });
          }
        }
      }
    });
    
    this.categoriesList = Array.from(catMap.values()).map(cat => ({
      id: cat.id,
      name: cat.name,
      subcategories: Array.from(cat.subcategories.values()).sort((a, b) => a.name.localeCompare(b.name))
    })).sort((a, b) => a.name.localeCompare(b.name));
  }

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.selectedSubcategoryId = null;
    this.currentPage = 1;
    this.applyFilters(this.currentFilters);
  }

  selectSubcategory(subcategoryId: number | null) {
    this.selectedSubcategoryId = subcategoryId;
    this.currentPage = 1;
    this.applyFilters(this.currentFilters);
  }

  getProductCount(categoryId: number): number {
    return this.products.filter((p: any) => parseInt(p.category_id, 10) === categoryId).length;
  }

  getSubproductCount(categoryId: number, subcategoryId: number): number {
    return this.products.filter((p: any) => 
      parseInt(p.category_id, 10) === categoryId && 
      parseInt(p.subcategory_id, 10) === subcategoryId
    ).length;
  }

  getActiveCategorySubcategories(): any[] {
    if (this.selectedCategoryId === null) return [];
    const activeCat = this.categoriesList.find(c => c.id === this.selectedCategoryId);
    return activeCat ? activeCat.subcategories : [];
  }

  toggleCategoriesMenu() {
    this.showCategoriesMenu = !this.showCategoriesMenu;
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
          this.buildCategoryMenu();
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
