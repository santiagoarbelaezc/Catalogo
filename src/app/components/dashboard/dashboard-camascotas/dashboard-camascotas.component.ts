import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoriesService, Category, Subcategory } from '../../../services/categories.service';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-camascotas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard-camascotas.component.html',
  styleUrl: './dashboard-camascotas.component.css'
})
export class DashboardCamascotasComponent implements OnInit {
  currentBrand = 'Camascotas';
  brandTitle = 'Categorías Camascotas';
  brandIcon = 'pets';

  // Sidebar & Navigation
  sidebarExpanded = true;
  sectionsDropdownOpen = true;

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
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  // Sidebar Controls
  toggleSidebar(): void {
    this.sidebarExpanded = !this.sidebarExpanded;
    this.cdr.markForCheck();
  }

  toggleSectionsDropdown(): void {
    if (!this.sidebarExpanded) {
      this.sidebarExpanded = true;
      this.sectionsDropdownOpen = true;
      this.cdr.markForCheck();
      return;
    }
    this.sectionsDropdownOpen = !this.sectionsDropdownOpen;
    this.cdr.markForCheck();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  navigateToProducts(): void {
    this.router.navigate(['/dashboard/productos']);
  }

  navigateToAnalytics(): void {
    this.router.navigate(['/dashboard/analiticas']);
  }

  navigateToCategories(): void {
    this.router.navigate(['/dashboard/categorias']);
  }

  navigateToEspumas(): void {
    this.router.navigate(['/dashboard/espumas']);
  }

  navigateToDistricol(): void {
    this.router.navigate(['/dashboard/districol']);
  }

  navigateToCamascotas(): void {
    this.router.navigate(['/dashboard/camascotas']);
  }

  openWebCatalog(): void {
    window.open('/catalogo', '_blank');
  }

  logout(): void {
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

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth < 1024) {
      this.sidebarExpanded = false;
      this.cdr.markForCheck();
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  loadCategories(selectCategoryName?: string): void {
    this.isLoadingCategories = true;
    this.categoriesService.getCategories('Camascotas').subscribe({
      next: (res) => {
        if (res.success) {
          this.categories = res.data;
          this.updateCategoriesView();

          if (selectCategoryName) {
            const target = this.categories.find(c => c.name.toLowerCase() === selectCategoryName.toLowerCase());
            if (target) {
              this.selectCategory(target);
            }
          } else if (this.selectedCategory) {
            const reSelected = this.categories.find(c => c.id === this.selectedCategory?.id);
            if (reSelected) {
              this.selectedCategory = reSelected;
            }
          }
        }
        this.isLoadingCategories = false;
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingCategories = false;
        this.toastService.error('No se pudieron cargar las categorías');
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoadingSubcategories = false;
        this.toastService.error('No se pudieron cargar las subcategorías');
        this.cdr.markForCheck();
      }
    });
  }

  updateCategoriesView(): void {
    let filtered = [...this.categories];

    if (this.searchCategory.trim()) {
      const term = this.searchCategory.toLowerCase().trim();
      filtered = filtered.filter(c => c.name.toLowerCase().includes(term));
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    const groups: { [key: string]: Category[] } = {};
    for (const cat of filtered) {
      const letter = cat.name.charAt(0).toUpperCase();
      if (!groups[letter]) {
        groups[letter] = [];
      }
      groups[letter].push(cat);
    }

    this.groupedCategories = Object.keys(groups).sort().map(letter => ({
      letter,
      categories: groups[letter]
    }));
    this.cdr.markForCheck();
  }

  updateSubcategoriesView(): void {
    let filtered = [...this.subcategories];

    if (this.searchSubcategory.trim()) {
      const term = this.searchSubcategory.toLowerCase().trim();
      filtered = filtered.filter(s => s.name.toLowerCase().includes(term));
    }

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    this.filteredSubcategories = filtered;
    this.cdr.markForCheck();
  }

  clearSearchCategory(): void {
    this.searchCategory = '';
    this.updateCategoriesView();
  }

  clearSearchSubcategory(): void {
    this.searchSubcategory = '';
    this.updateSubcategoriesView();
  }

  addCategory(): void {
    const trimmedName = this.newCategoryName.trim();
    if (!trimmedName) return;

    const exists = this.categories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());
    if (exists) {
      this.validationMessage = `Ya existe una categoría principal con el nombre "${trimmedName}". No puedes crear duplicados.`;
      this.showValidationModal = true;
      return;
    }

    this.categoriesService.createCategory({ name: trimmedName, brand: 'Camascotas' }).subscribe({
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

  addSubcategory(): void {
    if (!this.selectedCategory || !this.selectedCategory.id) return;

    const trimmedName = this.newSubcategoryName.trim();
    if (!trimmedName) return;

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

  confirmEdit(type: 'category' | 'subcategory', id: number, name: string, event?: Event): void {
    if (event) event.stopPropagation();
    this.editTargetType = type;
    this.editTargetId = id;
    this.editTargetOldName = name;
    this.editTargetNewName = name;
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

    if (this.editTargetNewName.trim().toLowerCase() === this.editTargetOldName.trim().toLowerCase()) {
      this.cancelEditModal();
      return;
    }

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
            this.loadCategories(this.editTargetNewName.trim());
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

