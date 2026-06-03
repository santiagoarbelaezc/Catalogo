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

  showEditModal = false;
  editTargetId: number | null = null;
  editTargetType: 'category' | 'subcategory' = 'category';
  editTargetOldName: string = '';
  editTargetNewName: string = '';

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

  // El modal de edición ahora maneja esto (confirmEdit y executeEdit)

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

  // El modal de edición ahora maneja esto (confirmEdit)

  // --- Lógica del Modal de Edición ---
  confirmEdit(type: 'category' | 'subcategory', id: number, name: string, event?: Event): void {
    if (event) event.stopPropagation();
    this.editTargetType = type;
    this.editTargetId = id;
    this.editTargetOldName = name;
    this.editTargetNewName = name; // Pre-fill with current name
    this.showEditModal = true;
  }

  cancelEditModal(): void {
    this.showEditModal = false;
    this.editTargetId = null;
    this.editTargetOldName = '';
    this.editTargetNewName = '';
  }

  executeEdit(): void {
    if (this.editTargetId === null) return;
    if (!this.editTargetNewName.trim()) {
      this.toastService.warning('El nombre no puede estar vacío.');
      return;
    }

    // Si no cambió el nombre, no hacer nada
    if (this.editTargetNewName.trim() === this.editTargetOldName.trim()) {
      this.cancelEditModal();
      return;
    }

    if (this.editTargetType === 'category') {
      this.categoriesService.updateCategory(this.editTargetId, { name: this.editTargetNewName.trim() }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadCategories();
            this.toastService.success('Categoría actualizada exitosamente.');
            this.cancelEditModal();
          }
        },
        error: (err: any) => {
          this.toastService.error('Error al actualizar la categoría.');
          this.cancelEditModal();
        }
      });
    } else {
      this.categoriesService.updateSubcategory(this.editTargetId, { name: this.editTargetNewName.trim() }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadSubcategories(this.selectedCategory!.id!);
            this.toastService.success('Subcategoría actualizada exitosamente.');
            this.cancelEditModal();
          }
        },
        error: (err: any) => {
          this.toastService.error('Error al actualizar la subcategoría.');
          this.cancelEditModal();
        }
      });
    }
  }
}
