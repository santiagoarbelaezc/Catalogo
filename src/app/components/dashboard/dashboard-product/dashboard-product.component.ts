import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProductsService } from '../../../services/products.service';
import { Subscription } from 'rxjs';

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
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-product.component.html',
  styleUrl: './dashboard-product.component.css'
})
export class DashboardProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
  products: any[] = [];
  isLoading = false;
  isSubmitting = false;
  showForm = false;
  editingProduct: any = null;
  selectedFiles: File[] = [];
  categories = ['Plaxtilineas', 'Districol', 'Espumasplasticos'];

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private productsService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.createForm();
  }

  ngOnInit() {
    // Verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

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
      variants: this.fb.array([])
    });
  }

  private loadProducts() {
    this.isLoading = true;
    const productsSub = this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success) {
          this.products = response.data || [];
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

  // Getters para FormArrays
  get colorsArray(): FormArray {
    return this.productForm.get('colors') as FormArray;
  }

  get variantsArray(): FormArray {
    return this.productForm.get('variants') as FormArray;
  }

  // Métodos para colores
  addColor(color: string = '') {
    this.colorsArray.push(new FormControl(color, Validators.required));
  }

  removeColor(index: number) {
    this.colorsArray.removeAt(index);
  }

  // Métodos para variantes
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

  // Manejo de archivos
  onFileSelected(event: any) {
    const files = Array.from(event.target.files) as File[];
    this.selectedFiles = files;
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  // CRUD Operations
  showCreateForm() {
    this.editingProduct = null;
    this.productForm.reset({
      category: 'Plaxtilineas',
      isNew: true,
      isFeatured: false
    });
    this.colorsArray.clear();
    this.variantsArray.clear();
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

    // Cargar colores
    this.colorsArray.clear();
    if (product.colors && product.colors.length > 0) {
      product.colors.forEach((color: string) => {
        this.colorsArray.push(this.fb.control(color));
      });
    }

    // Cargar variantes
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
        variants: formValue.variants.filter((v: any) => v.name.trim())
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
      }))
    };

    const formData = this.productsService.createFormData(normalizedData, this.selectedFiles);

    const createSub = this.productsService.createProduct(formData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Producto creado:', response.data);
          this.loadProducts();
          this.cancelEdit();
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error creando producto:', error);
        this.isSubmitting = false;
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
      }))
    };

    const updateSub = this.productsService.updateProduct(id, normalizedData).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Producto actualizado:', response.data);
          this.loadProducts();
          this.cancelEdit();
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        console.error('Error actualizando producto:', error);
        this.isSubmitting = false;
      }
    });
    this.subscriptions.push(updateSub);
  }

  deleteProduct(product: any) {
    if (confirm(`¿Estás seguro de que quieres eliminar "${product.name}"?`)) {
      const deleteSub = this.productsService.deleteProduct(product.id).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Producto eliminado');
            this.loadProducts();
          }
        },
        error: (error) => {
          console.error('Error eliminando producto:', error);
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

  // Navigation
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
