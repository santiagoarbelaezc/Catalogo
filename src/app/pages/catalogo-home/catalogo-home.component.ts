import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";
import { CatalogItemComponent } from "../../components/catalog/catalog-item/catalog-item.component";
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';

@Component({
  selector: 'app-catalogo-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, CatalogItemComponent],
  templateUrl: './catalogo-home.component.html',
  styleUrl: './catalogo-home.component.css'
})
export class CatalogoHomeComponent implements OnInit {
  products: CatalogProduct[] = [];
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 16; // Mostramos un poco más (16) en el Home

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          this.products = products;
        }
      },
      error: (error: any) => {
        console.error('Error cargando catálogo general:', error);
      }
    });
  }

  get paginatedProducts(): CatalogProduct[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get pagesList(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      const element = document.getElementById('catalogo-grid');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
