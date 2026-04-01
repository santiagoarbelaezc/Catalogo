import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';

import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-districol',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, NavbarComponent],
  templateUrl: './districol.component.html',
  styleUrl: './districol.component.css'
})
export class DistricolComponent implements OnInit {
  products: CatalogProduct[] = [];

  

  constructor(private productsService: ProductsService) {}
  
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          this.products = products.filter(
            (product: any) => product.category === 'Districol'
          );
        }
      },
      error: (error: any) => {
        console.error('Error cargando productos Districol:', error);
      }
    });
  }
}
