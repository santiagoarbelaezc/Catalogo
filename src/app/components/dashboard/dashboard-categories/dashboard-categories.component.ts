import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService, Category, Subcategory } from '../../../services/categories.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-categories.component.html',
  styleUrl: './dashboard-categories.component.css'
})
export class DashboardCategoriesComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  selectedCategory: Category | null = null;

  isLoadingCategories = false;
  isLoadingSubcategories = false;

  newCategoryName = '';
  newSubcategoryName = '';

  showDeleteModal = false;
  deleteTargetId: number | null = null;
  deleteTargetType: 'category' | 'subcategory' = 'category';
  deleteTargetName: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
        }
        this.isLoadingCategories = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingCategories = false;
        this.toastService.error('No se pudieron cargar las categorías');
      }
    });
  }

  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.loadSubcategories(category.id!);
  }

  loadSubcategories(categoryId: number): void {
    this.isLoadingSubcategories = true;
    this.categoriesService.getSubcategoriesByCategory(categoryId).subscribe({
      next: (res) => {
        if (res.success) {
          this.subcategories = res.data;
        }
        this.isLoadingSubcategories = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingSubcategories = false;
        this.toastService.error('No se pudieron cargar las subcategorías');
      }
    });
  }

  addCategory(): void {
    if (!this.newCategoryName.trim()) return;

    this.categoriesService.createCategory({ name: this.newCategoryName }).subscribe({
      next: (res) => {
        if (res.success) {
          this.newCategoryName = '';
          this.loadCategories();
          this.toastService.success('Categoría creada satisfactoriamente.');
        }
      },
      error: (err: any) => {
        this.toastService.error(err.error?.message || 'Error al crear la categoría.');
      }
    });
  }

  confirmDelete(type: 'category' | 'subcategory', id: number, name: string, event?: Event): void {
    if (event) event.stopPropagation();
    this.deleteTargetType = type;
    this.deleteTargetId = id;
    this.deleteTargetName = name;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.deleteTargetId = null;
    this.deleteTargetName = '';
  }

  executeDelete(): void {
    if (this.deleteTargetId === null) return;
    
    if (this.deleteTargetType === 'category') {
      this.categoriesService.deleteCategory(this.deleteTargetId).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadCategories();
            this.toastService.success('Categoría eliminada correctamente.');
            if (this.selectedCategory?.id === this.deleteTargetId) {
              this.selectedCategory = null;
              this.subcategories = [];
            }
            this.cancelDelete();
          }
        },
        error: (err: any) => {
          this.toastService.error('No se pudo eliminar la categoría.');
          this.cancelDelete();
        }
      });
    } else {
      this.categoriesService.deleteSubcategory(this.deleteTargetId).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadSubcategories(this.selectedCategory!.id!);
            this.toastService.success('Subcategoría eliminada correctamente.');
            this.cancelDelete();
          }
        },
        error: (err: any) => {
          this.toastService.error('No se pudo eliminar la subcategoría.');
          this.cancelDelete();
        }
      });
    }
  }

  editCategory(category: Category, event: Event): void {
    event.stopPropagation();
    const result = prompt('Editar Categoría', category.name);
    if (result !== null && result.trim() !== '') {
      this.categoriesService.updateCategory(category.id!, { name: result }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadCategories();
            this.toastService.success('Categoría actualizada exitosamente.');
          }
        }
      });
    }
  }

  addSubcategory(): void {
    if (!this.selectedCategory || !this.selectedCategory.id) return;
    if (!this.newSubcategoryName.trim()) return;

    this.categoriesService.createSubcategory({ 
      category_id: this.selectedCategory.id, 
      name: this.newSubcategoryName 
    }).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.newSubcategoryName = '';
          this.loadSubcategories(this.selectedCategory!.id!);
          this.toastService.success('Subcategoría creada satisfactoriamente.');
        }
      },
      error: (err: any) => {
        this.toastService.error(err.error?.message || 'Error al crear la subcategoría.');
      }
    });
  }

  // Eliminar subcategoría ahora pasa por el mismo modal (confirmDelete)

  editSubcategory(subcategory: Subcategory): void {
    const result = prompt('Editar Subcategoría', subcategory.name);
    if (result !== null && result.trim() !== '') {
      this.categoriesService.updateSubcategory(subcategory.id!, { name: result }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadSubcategories(this.selectedCategory!.id!);
            this.toastService.success('Subcategoría actualizada exitosamente.');
          }
        },
        error: (err: any) => {
          this.toastService.error('Error al actualizar la subcategoría.');
        }
      });
    }
  }
}
