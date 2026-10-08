import { Injectable, signal } from '@angular/core';
import { CatalogProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  selectedProduct = signal<CatalogProduct | null>(null);

  open(product: CatalogProduct): void {
    this.selectedProduct.set(product);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  close(): void {
    this.selectedProduct.set(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }
}
