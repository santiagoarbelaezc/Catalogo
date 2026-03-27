import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { ToastService } from '../../../services/toast.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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
  categories = ['Plaxtilineas', 'Districol', 'Espumas'];
  loadingError = false;

  // === Filters ===
  searchTerm = '';
  filterCategory = '';
  filterStatus = ''; // 'new', 'featured', ''
  private searchSubject = new Subject<string>();

  // === Pagination ===
  currentPage = 1;
  itemsPerPage = 12;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private productsService: ProductsService,
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
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.searchSubject.complete();
  }

  // === Filter & Pagination Computed Properties ===

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onCategoryChange() {
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  onStatusChange() {
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  clearFilters() {
    this.searchTerm = '';
    this.filterCategory = '';
    this.filterStatus = '';
    this.currentPage = 1;
    this.cdr.markForCheck();
  }

  get hasActiveFilters(): boolean {
    return this.searchTerm.length > 0 || this.filterCategory.length > 0 || this.filterStatus.length > 0;
  }

  get filteredProducts(): any[] {
    let result = [...this.products];

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

    // Filter by category
    if (this.filterCategory) {
      result = result.filter(p => p.category === this.filterCategory);
    }

    // Filter by status
    if (this.filterStatus === 'new') {
      result = result.filter(p => p.isNew === true || p.isNew === 1);
    } else if (this.filterStatus === 'featured') {
      result = result.filter(p => p.isFeatured === true || p.isFeatured === 1);
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
      description: ['', [Validators.required, Validators.minLength(10)]],
      material: ['', [Validators.required]],
      category: ['Plaxtilineas', [Validators.required]],
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
      description: [description, Validators.required]
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
      category: 'Plaxtilineas',
      isNew: true,
      isFeatured: false
    });
    this.colorsArray.clear();
    this.variantsArray.clear();
    this.imagesArray.clear();
    this.selectedFiles = [];
    this.showForm = true;
  }

  editProduct(product: any) {
    this.editingProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      material: product.material,
      category: product.category,
      options: product.options || '',
      isNew: product.isNew === 1 || product.isNew === true,
      isFeatured: product.isFeatured === 1 || product.isFeatured === true,
      marca: product.marca || '',
      gramaje: product.gramaje || '',
      brandIconUrl: product.brandIconUrl || ''
    });

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
  }

  cancelEdit() {
    this.showForm = false;
    this.editingProduct = null;
    this.productForm.reset();
    this.selectedFiles = [];
  }

  onSubmit() {
    if (this.productForm.valid) {
      this.isSubmitting = true;

      const formValue = this.productForm.value;
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
