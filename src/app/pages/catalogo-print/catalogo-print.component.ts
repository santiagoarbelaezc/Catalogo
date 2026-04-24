import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogDataService } from '../../services/catalog-data.service';
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { CatalogShortComponent } from '../../components/catalog/catalog-short/catalog-short.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo-print',
  standalone: true,
  imports: [CommonModule, CatalogShortComponent],
  templateUrl: './catalogo-print.component.html',
  styleUrl: './catalogo-print.component.css'
})
export class CatalogoPrintComponent implements OnInit {
  products: CatalogProduct[] = [];
  brandName: string = 'CATÁLOGO GENERAL';
  currentDate: string = new Date().toLocaleDateString('es-CO', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  });

  constructor(
    private catalogDataService: CatalogDataService,
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.products = this.catalogService.getAllCatalogProducts();
    
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          const brandParam = this.route.snapshot.queryParamMap.get('brand');
          
          if (brandParam) {
            this.brandName = brandParam.toUpperCase();
            this.products = products.filter(p => 
              p.category?.toLowerCase() === brandParam.toLowerCase() || 
              p.marca?.toLowerCase() === brandParam.toLowerCase()
            );
          } else {
            this.products = products;
          }

          // Disparamos la impresión automáticamente tras un pequeño delay
          setTimeout(() => {
            window.print();
          }, 1500); 
        }
      },
      error: (error) => {
        console.error('Error cargando productos:', error);
      }
    });
  }
}
