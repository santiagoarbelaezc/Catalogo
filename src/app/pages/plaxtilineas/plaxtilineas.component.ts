import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogDesignComponent } from '../../components/catalog/catalog-design/catalog-design.component';

import { CatalogDataService } from '../../services/catalog-data.service';
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-plaxtilineas',
  standalone: true,
  imports: [CommonModule, CatalogDesignComponent, NavbarComponent],
  templateUrl: './plaxtilineas.component.html',
  styleUrl: './plaxtilineas.component.css'
})
export class PlaxtilineasComponent implements OnInit {
  products: CatalogProduct[] = [];

 

  constructor(
    private catalogDataService: CatalogDataService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // this.products = this.catalogDataService.getPlaxtilineasProducts();
    
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.products = response.data.filter(
            (product: any) => product.category === 'Plaxtilineas'
          );
        }
      },
      error: (error) => {
        console.error('Error cargando productos Plaxtilineas:', error);
      }
    });
  }
}
