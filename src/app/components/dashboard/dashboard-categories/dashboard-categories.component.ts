import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService, Category, Subcategory } from '../../../services/categories.service';
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

  constructor(
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  goBack(): void {
    this.router.navigate(['/dashboard/inicio']);
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
        alert('No se pudieron cargar las categorías');
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
        this.isLoadingCategories = false;
        alert('No se pudieron cargar las subcategorías');
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
          alert('Categoría creada');
        }
      },
      error: (err: any) => {
        alert(err.error?.message || 'Error al crear');
      }
    });
  }

  deleteCategory(id: number, event: Event): void {
    event.stopPropagation();
    if (confirm('¿Eliminar categoría? Se eliminarán también sus subcategorías. Esta acción no se puede deshacer.')) {
      this.categoriesService.deleteCategory(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadCategories();
            if (this.selectedCategory?.id === id) {
              this.selectedCategory = null;
              this.subcategories = [];
            }
          }
        },
        error: (err: any) => {
          alert('No se pudo eliminar');
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
          alert('Subcategoría creada');
        }
      },
      error: (err: any) => {
        alert(err.error?.message || 'Error al crear');
      }
    });
  }

  deleteSubcategory(id: number): void {
    if (confirm('¿Eliminar subcategoría?')) {
      this.categoriesService.deleteSubcategory(id).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadSubcategories(this.selectedCategory!.id!);
          }
        }
      });
    }
  }

  editSubcategory(subcategory: Subcategory): void {
    const result = prompt('Editar Subcategoría', subcategory.name);
    if (result !== null && result.trim() !== '') {
      this.categoriesService.updateSubcategory(subcategory.id!, { name: result }).subscribe({
        next: (res: any) => {
          if (res.success) {
            this.loadSubcategories(this.selectedCategory!.id!);
          }
        }
      });
    }
  }
}
