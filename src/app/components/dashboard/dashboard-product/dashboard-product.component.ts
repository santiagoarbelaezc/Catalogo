import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { ToastService } from '../../../services/toast.service';
import { CategoriesService, Category, Subcategory } from '../../../services/categories.service';
import { AiService } from '../../../services/ai.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

interface Product {
  id?: number;
  name: string;
  description: string;
  material: string;
  category: string;
  options?: string;
  isNew: boolean;
  isFeatured: boolean;
  marca?: string;
  gramaje?: string;
  brandIconUrl?: string;
  colors: string[];
  variants: any[];
  images?: any[];
}

@Component({
  selector: 'app-dashboard-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, BaseChartDirective],
  templateUrl: './dashboard-product.component.html',
  styleUrl: './dashboard-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  products: any[] = [];
  isLoading = false;
  isSubmitting = false;
  showForm = false;
  editingProduct: any = null;
  selectedFiles: File[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  loadingError = false;
  savedScrollPosition = 0;

  isGeneratingDescription = false;
  isSuggestingCategory = false;

  // === Filters ===
  searchTerm = '';
  filterCategory = '';
  filterStatus = ''; // 'new', 'featured', ''
  filterBrand = ''; // '', 'Plaxtilineas', 'Espumas', 'Districol'
  sortOrder = 'newest'; // 'newest', 'oldest', 'price_asc', 'price_desc', 'az', 'za'
  private searchSubject = new Subject<string>();

  // === Pagination ===
  currentPage = 1;
  itemsPerPage = 12;

  activeActionFilter: string | null = null;
  showReports = false;

  // === MODAL REPORT STATE ===
  reportTab = 0; // 0=Resumen, 1=Calidad, 2=Por Categoría
  reportLineFilter = ''; // '', 'Plaxtilineas', 'Espumas', 'Districol'
  reportCategoryFilter = ''; // ID or name of selected category
  activeActionCard: string | null = null; // 'description'|'images'|'variants'|'price'
  problemProducts: any[] = []; // Products matching active action card

  statsGlobal = {
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

  statsData = {
    missingDescription: 0,
    missingImages: 0,
    missingPrice: 0,
    missingVariants: 0
  };

  // Unique category names for Pestaña 3
  get uniqueCategoryNames(): string[] {
    const names = new Set<string>();
    this.products.forEach(p => { if (p.category_name) names.add(p.category_name); });
    return Array.from(names).sort();
  }

  // Products for the selected category in Pestaña 3
  get categoryAnalysisProducts(): any[] {
    if (!this.reportCategoryFilter) return [];
    return this.products.filter(p => p.category_name === this.reportCategoryFilter);
  }

  // Count products WITH a property in the selected category
  getCategoryCount(type: 'images' | 'description' | 'variants' | 'price'): number {
    return this.categoryAnalysisProducts.filter(p => {
      if (type === 'images') return p.images && p.images.length > 0;
      if (type === 'description') return p.description && p.description.trim() !== '';
      if (type === 'variants') return p.variants && p.variants.length > 0;
      if (type === 'price') return p.variants && p.variants.length > 0 && !p.variants.some((v: any) => !v.price || v.price <= 0);
      return false;
    }).length;
  }

  // Stats computed for the currently filtered line (Pestaña 2)
  get filteredLineStats() {
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

  public lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'right', labels: { font: { size: 12 }, padding: 16 } } },
    cutout: '65%'
  };
  public lineChartType: ChartType = 'doughnut';
  public lineChartData: ChartData<'doughnut'> = {
    labels: ['Plaxtilineas', 'Espumas', 'Districol', 'Otros'],
    datasets: [ { data: [0, 0, 0, 0], backgroundColor: ['#059669', '#2563eb', '#b45309', '#94a3b8'], borderWidth: 0, hoverOffset: 8 } ]
  };

  public categoryChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: { legend: { display: false } },
    scales: { x: { beginAtZero: true, grid: { color: '#f1f5f9' } }, y: { grid: { display: false } } }
  };
  public categoryChartType: ChartType = 'bar';
  public categoryChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [ { data: [], backgroundColor: '#6366f1', borderRadius: 6, barPercentage: 0.6 } ]
  };
  // =============================

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private aiService: AiService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    // Debounce search input (300ms)
    const searchSub = this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(term => {
        this.searchTerm = term;
        this.currentPage = 1;
        this.cdr.markForCheck();
      });
    this.subscriptions.push(searchSub);

    this.loadProducts();
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
          this.cdr.markForCheck();
        }
      }
    });
  }

  onCategorySelectChange(event: any) {
    const categoryId = parseInt(event.target.value, 10);
    this.loadSubcategories(categoryId);
  }

  loadSubcategories(categoryId: number) {
    this.subcategories = [];
    this.productForm.get('subcategory_id')?.setValue('');
    if (!categoryId) return;
    
    this.categoriesService.getSubcategoriesByCategory(categoryId).subscribe({
      next: (res) => {
        if (res.success) {
          this.subcategories = res.data;
          this.cdr.markForCheck();
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.searchSubject.complete();
  }

  // === AI Assistant Methods ===

  generateAiDescription() {
    const name = this.productForm.get('name')?.value;
    if (!name || name.trim() === '') {
      this.toastService.warning('Por favor, ingresa primero el nombre del producto.');
      return;
    }

    this.isGeneratingDescription = true;
    this.cdr.markForCheck();

    this.aiService.generateDescription(name).subscribe({
      next: (res) => {
        if (res.success && res.description) {
          this.productForm.patchValue({ description: res.description });
          this.toastService.success('Descripción generada por IA exitosamente.');
        } else {
          this.toastService.error(res.message || 'Error al generar la descripción.');
        }
        this.isGeneratingDescription = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Error de red al conectar con el Asistente IA.');
        this.isGeneratingDescription = false;
        this.cdr.markForCheck();
      }
    });
  }

  suggestAiCategory() {
    const name = this.productForm.get('name')?.value;
    const description = this.productForm.get('description')?.value || '';

    if (!name || name.trim() === '') {
      this.toastService.warning('Por favor, ingresa el nombre del producto primero.');
      return;
    }

    if (this.categories.length === 0) {
      this.toastService.warning('No hay categorías cargadas para analizar.');
      return;
    }

    this.isSuggestingCategory = true;
    this.cdr.markForCheck();

    this.aiService.suggestCategory(name, description, this.categories).subscribe({
      next: (res) => {
        if (res.success && res.subcategory_id) {
          
          let foundCategoryId: number | null = null;
          
          if ((res as any).category_id) {
             this.productForm.patchValue({ category_id: (res as any).category_id });
             this.loadSubcategories((res as any).category_id);
             setTimeout(() => {
                this.productForm.patchValue({ subcategory_id: res.subcategory_id });
                this.cdr.markForCheck();
             }, 300);
          } else {
             this.productForm.patchValue({ subcategory_id: res.subcategory_id });
          }

          this.toastService.success('Clasificación IA completada.');
        } else {
          this.toastService.warning('La IA no encontró una categoría adecuada.');
        }
        this.isSuggestingCategory = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.toastService.error('Error al solicitar sugerencia de categoría.');
        this.isSuggestingCategory = false;
        this.cdr.markForCheck();
      }
    });
  }

  // === Filter & Pagination Computed Properties ===

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onBrandChange(brand: string) {
    this.filterBrand = brand;
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  onCategoryChange() {
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  onStatusChange() {
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  onSortChange() {
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterCategory = '';
    this.filterStatus = '';
    this.filterBrand = '';
    this.sortOrder = 'newest';
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  get hasActiveFilters(): boolean {
    return this.searchTerm.length > 0 || this.filterCategory.length > 0 || this.filterStatus.length > 0 || this.filterBrand.length > 0 || this.sortOrder !== 'newest';
  }

  get headerColorClass(): string {
    switch (this.filterBrand.toLowerCase()) {
      case 'plaxtilineas':
        return 'bg-emerald-700 shadow-emerald-700/20';
      case 'espumas':
        return 'bg-blue-700 shadow-blue-700/20';
      case 'districol':
        return 'bg-amber-800 shadow-amber-800/20';
      default:
        return 'bg-slate-900 shadow-slate-900/10';
    }
  }

  // --- REPORTS & STATS LOGIC ---
  toggleReports() {
    this.showReports = !this.showReports;
    if (this.showReports) {
      this.reportTab = 0;
      this.reportLineFilter = '';
      this.reportCategoryFilter = '';
      this.activeActionCard = null;
      this.problemProducts = [];
      this.calculateStats();
    }
  }

  closeModal() {
    this.showReports = false;
    this.cdr.markForCheck();
  }

  calculateStats() {
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
      total, plaxtilineas: plaxti, espumas, districol: distri, otros,
      missingDescription: missingDesc, missingImages: missingImg,
      missingPrice, missingVariants: missingVars,
      complete, completePct: total > 0 ? Math.round((complete / total) * 100) : 0
    };

    this.statsData = {
      missingDescription: missingDesc, missingImages: missingImg,
      missingPrice, missingVariants: missingVars
    };

    this.lineChartData = {
      labels: ['Plaxtilineas', 'Espumas', 'Districol', 'Otros'],
      datasets: [ { data: [plaxti, espumas, distri, otros], backgroundColor: ['#059669', '#2563eb', '#b45309', '#94a3b8'], borderWidth: 0, hoverOffset: 8 } ]
    };

    const sortedCats = Object.entries(catCounts).sort((a, b) => b[1] - a[1]).slice(0, 10);
    this.categoryChartData = {
      labels: sortedCats.map(c => c[0]),
      datasets: [ { data: sortedCats.map(c => c[1]), backgroundColor: '#6366f1', borderRadius: 6, barPercentage: 0.6 } ]
    };
  }

  selectActionCard(type: 'description' | 'images' | 'variants' | 'price') {
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

  applyActionFilter() {
    if (!this.activeActionCard) return;
    this.filterActionable(this.activeActionCard as any);
    this.closeModal();
  }

  filterActionable(type: 'description' | 'images' | 'variants' | 'price' | null) {
    this.activeActionFilter = type;
    this.filterBrand = '';
    this.searchTerm = '';
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  onReportLineFilterChange() {
    this.activeActionCard = null;
    this.problemProducts = [];
    this.cdr.markForCheck();
  }
  // -----------------------------

  get filteredProducts(): any[] {
    let result = [...this.products];

    if (this.activeActionFilter) {
      const type = this.activeActionFilter;
      result = result.filter(p => {
        if (type === 'description') return !p.description || p.description.trim() === '';
        if (type === 'images') return !p.images || p.images.length === 0;
        if (type === 'variants') return !p.variants || p.variants.length === 0;
        if (type === 'price') return p.variants && p.variants.length > 0 && p.variants.some((v: any) => !v.price || v.price <= 0);
        return true;
      });
    }

    if (this.filterBrand && !this.activeActionFilter) {
      const bTerm = this.filterBrand.toLowerCase();
      result = result.filter(p => p.category?.toLowerCase().includes(bTerm));
    }

    // Search by name
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter(p =>
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.marca?.toLowerCase().includes(term) ||
        p.material?.toLowerCase().includes(term)
      );
    }

    // Filter by category (dropdown)
    if (this.filterCategory) {
      result = result.filter(p => p.category_name === this.filterCategory || p.category_id === this.filterCategory);
    }

    // Filter by status
    if (this.filterStatus === 'new') {
      result = result.filter(p => p.isNew === true || p.isNew === 1);
    } else if (this.filterStatus === 'featured') {
      result = result.filter(p => p.isFeatured === true || p.isFeatured === 1);
    }

    // Apply sorting
    if (this.sortOrder === 'newest') {
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    } else if (this.sortOrder === 'oldest') {
      result.sort((a, b) => (a.id || 0) - (b.id || 0));
    } else if (this.sortOrder === 'az') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (this.sortOrder === 'za') {
      result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
    } else if (this.sortOrder === 'price_asc' || this.sortOrder === 'price_desc') {
      result.sort((a, b) => {
        const getMinPrice = (p: any) => p.variants && p.variants.length > 0 ? Math.min(...p.variants.map((v: any) => v.price || 0)) : 0;
        const priceA = getMinPrice(a);
        const priceB = getMinPrice(b);
        return this.sortOrder === 'price_asc' ? priceA - priceB : priceB - priceA;
      });
    }

    return result;
  }

  get totalFilteredProducts(): number {
    return this.filteredProducts.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalFilteredProducts / this.itemsPerPage);
  }

  get paginatedProducts(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredProducts.slice(start, start + this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  get showingFrom(): number {
    if (this.totalFilteredProducts === 0) return 0;
    return (this.currentPage - 1) * this.itemsPerPage + 1;
  }

  get showingTo(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalFilteredProducts);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.cdr.markForCheck();
      // Scroll al top de la sección de productos
      const el = document.querySelector('.products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  // === Utils ===
  getMinPrice(product: any): number {
    if (!product.variants || product.variants.length === 0) return 0;
    const prices = product.variants.map((v: any) => parseFloat(v.price) || 0);
    return Math.min(...prices);
  }

  hasValidPrice(product: any): boolean {
    return product.variants && product.variants.length > 0 &&
      !product.variants.some((v: any) => !v.price || parseFloat(v.price) <= 0);
  }

  // === trackBy ===
  trackByProductId(index: number, product: any): number {
    return product.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // === Form ===
  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      material: [''],
      category: ['', [Validators.required]], // Línea de negocio
      category_id: ['', [Validators.required]],
      subcategory_id: [''],
      options: [''],
      isNew: [true],
      isFeatured: [false],
      marca: [''],
      gramaje: [''],
      brandIconUrl: [''],
      colors: this.fb.array([]),
      variants: this.fb.array([]),
      images: this.fb.array([])
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.loadingError = false;
    this.cdr.markForCheck();

    const productsSub = this.productsService.getAllProducts().subscribe({
      next: (response) => {
        // Fallback or exact
        const data = response.data !== undefined ? response.data : response;
        this.products = data || [];
        this.calculateStats(); // CALCULAR ESTADÍSTICAS AQUÍ
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
        this.loadingError = true;
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(productsSub);
  }

  get colorsArray(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get variantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  get imagesArray(): FormArray {
    return this.productForm.get('images') as FormArray;
  }

  addColor(color: string = '') {
    this.colorsArray.push(new FormControl(color, Validators.required));
  }

  removeColor(index: number) {
    this.colorsArray.removeAt(index);
  }

  addVariant() {
    const variantGroup = this.fb.group({
      name: ['', Validators.required],
      available: [true],
      price: [0, [Validators.min(0)]]
    });
    this.variantsArray.push(variantGroup);
  }

  removeVariant(index: number) {
    this.variantsArray.removeAt(index);
  }

  addImage(url: string = '', description: string = '') {
    const imageGroup = this.fb.group({
      url: [url, [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: [description]
    });
    this.imagesArray.push(imageGroup);
  }

  removeImage(index: number) {
    this.imagesArray.removeAt(index);
  }

  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  showCreateForm() {
    this.editingProduct = null;
    this.productForm.reset({
      category: '',
      category_id: '',
      subcategory_id: '',
      isNew: true,
      isFeatured: false
    });
    this.subcategories = [];
    this.colorsArray.clear();
    this.variantsArray.clear();
    this.imagesArray.clear();
    this.selectedFiles = [];
    this.showForm = true;

    if (typeof window !== 'undefined') {
      this.savedScrollPosition = window.scrollY;
    }
  }

  editProduct(product: any) {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      material: product.material,
      category: product.category,
      category_id: product.category_id || '',
      subcategory_id: product.subcategory_id || '',
      options: product.options || '',
      isNew: product.isNew === 1 || product.isNew === true,
      isFeatured: product.isFeatured === 1 || product.isFeatured === true,
      marca: product.marca || '',
      gramaje: product.gramaje || '',
      brandIconUrl: product.brandIconUrl || ''
    });

    if (product.category_id) {
      this.categoriesService.getSubcategoriesByCategory(product.category_id).subscribe(res => {
        if (res.success) {
          this.subcategories = res.data;
          this.productForm.patchValue({ subcategory_id: product.subcategory_id || '' });
          this.cdr.markForCheck();
        }
      });
    } else {
      this.subcategories = [];
    }

    this.colorsArray.clear();
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach((color: string) => {
        this.colorsArray.push(this.fb.control(color));
      });
    }

    this.variantsArray.clear();
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach((variant: any) => {
        const variantGroup = this.fb.group({
          name: [variant.name, Validators.required],
          available: [variant.available === 1 || variant.available === true],
          price: [variant.price ? parseFloat(variant.price) : 0, [Validators.min(0)]]
        });
        this.variantsArray.push(variantGroup);
      });
    }

    this.imagesArray.clear();
    if (product.images && product.images.length > 0) {
      product.images.forEach((image: any) => {
        this.addImage(image.url, image.description);
      });
    }

    this.selectedFiles = [];
    this.showForm = true;

    if (typeof window !== 'undefined') {
      this.savedScrollPosition = window.scrollY;
    }
  }

  cancelEdit() {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset();
    this.selectedFiles = [];
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.scrollTo({ top: this.savedScrollPosition, behavior: 'auto' });
      }, 50);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;

      const formValue = this.productForm.value;
      
      // Find category name to keep backward compatibility
      const selectedCat = this.categories.find(c => c.id == formValue.category_id);
      
      const productData = {
        ...formValue,
        colors: formValue.colors.filter((c: string) => c.trim()),
        variants: formValue.variants.filter((v: any) => v.name.trim()),
        images: formValue.images.filter((img: any) => img.url && img.url.trim())
      };

      if (this.editingProduct) {
        this.updateProduct(this.editingProduct.id, productData);
      } else {
        this.createProduct(productData);
      }
    } else {
      this.markFormGroupTouched();
      this.toastService.error('Faltan campos obligatorios. Revisa las áreas en rojo.');
    }
  }

  private createProduct(productData: any) {
    const normalizedData = {
      ...productData,
      isNew: productData.isNew === 1 || productData.isNew === true,
      isFeatured: productData.isFeatured === 1 || productData.isFeatured === true,
      variants: productData.variants.map((v: any) => ({
        ...v,
        available: v.available === 1 || v.available === true,
        price: parseFloat(v.price) || 0
      })),
      images: productData.images.filter((img: any) => img.url && img.url.trim())
    };

    const formData = this.productsService.createFormData(normalizedData, this.selectedFiles);

    const createSub = this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        if (response.success !== false) {
          this.toastService.success('Producto creado satisfactoriamente.');
          this.loadProducts();
          this.cancelEdit();
        }
        this.isSubmitting = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(createSub);
  }

  private updateProduct(id: number, productData: any) {
    const normalizedData = {
      ...productData,
      isNew: productData.isNew === 1 || productData.isNew === true,
      isFeatured: productData.isFeatured === 1 || productData.isFeatured === true,
      variants: productData.variants.map((v: any) => ({
        ...v,
        available: v.available === 1 || v.available === true,
        price: parseFloat(v.price) || 0
      })),
      images: productData.images.filter((img: any) => img.url && img.url.trim())
    };

    const formData = this.productsService.createFormData(normalizedData, this.selectedFiles.length > 0 ? this.selectedFiles : undefined);

    const updateSub = this.productsService.updateProduct(id, formData).subscribe({
      next: (response) => {
        if (response.success !== false) {
          this.toastService.success('Producto actualizado exitosamente.');
          this.loadProducts();
          this.cancelEdit();
        }
        this.isSubmitting = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.cdr.markForCheck();
      }
    });
    this.subscriptions.push(updateSub);
  }

  deleteProduct(product: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      const deleteSub = this.productsService.deleteProduct(product.id).subscribe({
        next: (response) => {
          if (response.success !== false) {
            this.toastService.success('Producto eliminado correctamente.');
            this.loadProducts();
          }
        },
        error: (error) => {
          // El interceptor ya maneja el error toast
        }
      });
      this.subscriptions.push(deleteSub);
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
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
}
