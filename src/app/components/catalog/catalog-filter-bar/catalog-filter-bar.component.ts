import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CatalogFilters {
  minPrice: number | null;
  maxPrice: number | null;
  sortBy: string;
  searchQuery: string;
}

@Component({
  selector: 'app-catalog-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog-filter-bar.component.html',
  styleUrl: './catalog-filter-bar.component.css'
})
export class CatalogFilterBarComponent {
  @Input() totalProducts: number = 0;
  @Output() filtersChanged = new EventEmitter<CatalogFilters>();

  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortBy: string = 'name-asc';
  searchQuery: string = '';

  onFilterChange() {
    this.filtersChanged.emit({
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sortBy: this.sortBy,
      searchQuery: this.searchQuery
    });
  }

  resetFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = 'name-asc';
    this.searchQuery = '';
    this.onFilterChange();
  }
}
