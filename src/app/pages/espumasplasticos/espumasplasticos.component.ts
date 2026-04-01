import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';

import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-espumasplasticos',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, NavbarComponent],
  templateUrl: './espumasplasticos.component.html',
  styleUrl: './espumasplasticos.component.css'
})
export class EspumasplasticosComponent implements OnInit {
  products: CatalogProduct[] = [];
  
  // Paginación
  currentPage: number = 1;
  itemsPerPage: number = 12;

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
      // Hacer scroll suave hacia el inicio de la sección de productos
      const element = document.getElementById('espumasplasticos-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          this.products = products.filter(
            (product: any) => product.category === 'Espumas'
          );
        }
      },
      error: (error) => {
        console.error('Error cargando productos Espumas Plásticas:', error);
      }
    });
  }
}
