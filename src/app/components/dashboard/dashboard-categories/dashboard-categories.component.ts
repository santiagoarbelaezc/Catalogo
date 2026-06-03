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

  searchCategory = '';
  searchSubcategory = '';

  groupedCategories: { letter: string, categories: Category[] }[] = [];
  filteredSubcategories: Subcategory[] = [];

  showDeleteModal = false;
  deleteTargetId: number | null = null;
  deleteTargetType: 'category' | 'subcategory' = 'category';
  deleteTargetName: string = '';

  showEditModal = false;
  editTargetId: number | null = null;
  editTargetType: 'category' | 'subcategory' = 'category';
  editTargetOldName: string = '';
  editTargetNewName: string = '';

  showValidationModal = false;
  validationMessage = '';

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

  loadCategories(selectCategoryName?: string): void {
    this.isLoadingCategories = true;
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
          this.updateCategoriesView();

          if (selectCategoryName) {
            const newlyCreated = this.categories.find(c => c.name.toLowerCase() === selectCategoryName.toLowerCase());
            if (newlyCreated) {
              this.selectCategory(newlyCreated);
            }
          }
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
          this.updateSubcategoriesView();
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

  // --- Métodos para Filtros y Agrupación ---

  updateCategoriesView(): void {
    let filtered = [...this.categories];
    
    // 1. Filtrar
    if (this.searchCategory.trim()) {
      const term = this.searchCategory.toLowerCase().trim();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(term));
    }

    // 2. Ordenar alfabéticamente
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    // 3. Agrupar por primera letra
    const groups: { [key: string]: Category[] } = {};
    for (const cat of filtered) {
      const letter = cat.name.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(cat);
    }

    // 4. Convertir a arreglo y ordenar por letra
    this.groupedCategories = Object.keys(groups).sort().map(letter => ({
      letter,
      categories: groups[letter]
    }));
  }

  updateSubcategoriesView(): void {
    let filtered = [...this.subcategories];
    
    // 1. Filtrar
    if (this.searchSubcategory.trim()) {
      const term = this.searchSubcategory.toLowerCase().trim();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(term));
    }

    // 2. Ordenar alfabéticamente
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    
    this.filteredSubcategories = filtered;
  }

  addCategory(): void {
    const trimmedName = this.newCategoryName.trim();
    if (!trimmedName) return;

    // Validación de duplicados
    const exists = this.categories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      this.validationMessage = `Ya existe una categoría principal con el nombre "${trimmedName}". No puedes crear duplicados.`;
      this.showValidationModal = true;
      return;
    }

    this.categoriesService.createCategory({ name: trimmedName }).subscribe({
      next: (res) => {
        if (res.success) {
          this.newCategoryName = '';
          this.loadCategories(trimmedName);
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
    
    const trimmedName = this.newSubcategoryName.trim();
    if (!trimmedName) return;

    // Validación de duplicados
    const exists = this.subcategories.some(s => s.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      this.validationMessage = `Ya existe la subcategoría "${trimmedName}" dentro de ${this.selectedCategory.name}.`;
      this.showValidationModal = true;
      return;
    }

    this.categoriesService.createSubcategory({ 
      category_id: this.selectedCategory.id, 
      name: trimmedName 
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
    if (this.editTargetNewName.trim().toLowerCase() === this.editTargetOldName.trim().toLowerCase()) {
      this.cancelEditModal();
      return;
    }

    // Validación de duplicados en la edición
    if (this.editTargetType === 'category') {
      const exists = this.categories.some(c => c.name.toLowerCase() === this.editTargetNewName.trim().toLowerCase() && c.id !== this.editTargetId);
      if (exists) {
        this.validationMessage = `Ya existe una categoría principal con el nombre "${this.editTargetNewName.trim()}".`;
        this.showValidationModal = true;
        return;
      }
    } else {
      const exists = this.subcategories.some(s => s.name.toLowerCase() === this.editTargetNewName.trim().toLowerCase() && s.id !== this.editTargetId);
      if (exists) {
        this.validationMessage = `Ya existe la subcategoría "${this.editTargetNewName.trim()}" en esta categoría.`;
        this.showValidationModal = true;
        return;
      }
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
