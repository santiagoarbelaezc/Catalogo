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
