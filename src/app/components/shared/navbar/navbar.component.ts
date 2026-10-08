import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapMarkerAlt, faPhone, faStore, faBars, faTimes, faSearch, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { ProductDetailService } from '../../../services/product-detail.service';
import { CatalogProduct } from '../../../models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;

  // Search state
  searchQuery = '';
  searchResults: CatalogProduct[] = [];
  allProducts: CatalogProduct[] = [];
  hasLoadedProducts = false;
  isLoadingProducts = false;
  isDropdownOpen = false;

  // Font Awesome icons
  faMapMarkerAlt = faMapMarkerAlt;
  faPhone = faPhone;
  faStore = faStore;
  faBars = faBars;
  faTimes = faTimes;
  faSearch = faSearch;
  faUserShield = faUserShield;

  constructor(
    public authService: AuthService,
    private productsService: ProductsService,
    private productDetailService: ProductDetailService,
    private router: Router,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Carga inicial en background para tener resultados instantáneos al teclear
    this.loadProducts();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  loadProducts(): void {
    if (this.hasLoadedProducts || this.isLoadingProducts) return;
    this.isLoadingProducts = true;

    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        this.isLoadingProducts = false;
        if (products && Array.isArray(products)) {
          this.allProducts = products;
          this.hasLoadedProducts = true;
          if (this.searchQuery.trim().length > 0) {
            this.filterProducts();
          }
        }
      },
      error: (err) => {
        this.isLoadingProducts = false;
        console.error('Error cargando productos en el buscador del navbar:', err);
      }
    });
  }

  onSearchFocus(): void {
    if (!this.hasLoadedProducts) {
      this.loadProducts();
    }
    if (this.searchQuery.trim().length > 0) {
      this.filterProducts();
      this.isDropdownOpen = true;
    }
  }

  onSearchInput(): void {
    if (!this.hasLoadedProducts) {
      this.loadProducts();
    }
    if (this.searchQuery.trim().length === 0) {
      this.searchResults = [];
      this.isDropdownOpen = false;
      return;
    }
    this.filterProducts();
    this.isDropdownOpen = true;
  }

  filterProducts(): void {
    const term = this.searchQuery.toLowerCase().trim();
    if (!term) {
      this.searchResults = [];
      return;
    }

    this.searchResults = this.allProducts.filter(p => {
      const nameMatch = p.name ? p.name.toLowerCase().includes(term) : false;
      const catMatch = p.category ? p.category.toLowerCase().includes(term) : false;
      const catNameMatch = p.category_name ? p.category_name.toLowerCase().includes(term) : false;
      const brandMatch = p.marca ? p.marca.toLowerCase().includes(term) : false;
      const descMatch = p.description ? p.description.toLowerCase().includes(term) : false;
      const materialMatch = p.material ? p.material.toLowerCase().includes(term) : false;
      return nameMatch || catMatch || catNameMatch || brandMatch || descMatch || materialMatch;
    }).slice(0, 8); // Top 8 resultados más directos
  }

  openProduct(product: CatalogProduct): void {
    this.productDetailService.open(product);
    this.closeSearch();
  }

  submitSearch(): void {
    if (!this.searchQuery.trim()) return;
    const q = this.searchQuery.trim();
    this.closeSearch();
    this.router.navigate(['/catalogo'], { queryParams: { q: q } });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
    this.isDropdownOpen = false;
  }

  closeSearch(): void {
    this.isDropdownOpen = false;
  }

  getProductImage(product: CatalogProduct): string | null {
    if (product.images && product.images.length > 0) {
      return product.images[0].url;
    }
    return null;
  }

  getProductPrice(product: CatalogProduct): string | null {
    const variants = product.references || product.variants || [];
    if (variants.length === 0) return null;
    const prices = variants
      .map(v => v.price)
      .filter((p): p is number => p !== undefined && p !== null && p > 0);
    if (prices.length === 0) return null;
    const min = Math.min(...prices);
    return `$ ${min.toLocaleString('es-CO')}`;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.closeSearch();
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeSearch();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }
}
