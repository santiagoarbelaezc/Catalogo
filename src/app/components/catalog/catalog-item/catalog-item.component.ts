import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogProduct } from '../../../models/product.model';
import { ProductDetailService } from '../../../services/product-detail.service';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  @Input() product!: CatalogProduct;
  @Input() backgroundGradient: string = 'var(--primary-bg),var(--primary-bg)';
  @Input() reverseLayout: boolean = false;

  selectedVariant: any = null;
  selectedImageIndex: number = 0;
  quantity: number = 1;

  constructor(public detailService: ProductDetailService) {}

  ngOnInit() {
    const variants = this.product.references || this.product.variants || [];
    const availableVariants = variants.filter(v => v.available);
    if (availableVariants.length > 0) {
      this.selectedVariant = availableVariants[0];
    } else if (variants.length > 0) {
      this.selectedVariant = variants[0];
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  get currentImageUrl(): string | null {
    if (this.product?.images && this.product.images[this.selectedImageIndex]) {
      return this.product.images[this.selectedImageIndex].url;
    }
    if (this.product?.images && this.product.images[0]) {
      return this.product.images[0].url;
    }
    return null;
  }

  get priceDisplay(): string | null {
    if (this.selectedVariant && this.selectedVariant.price) {
      return this.formatPrice(Number(this.selectedVariant.price));
    }
    const variants = this.product.references || this.product.variants || [];
    const prices = variants
      .map(v => v.price)
      .filter((p): p is number => p !== undefined && p !== null);

    if (prices.length === 0) return null;

    const min = Math.min(...prices);
    return this.formatPrice(min);
  }

  get selectedPrice(): number {
    if (this.selectedVariant) {
      return Number(this.selectedVariant.price) || 0;
    }
    const variants = this.product.references || this.product.variants || [];
    const prices = variants
      .map(v => Number(v.price) || 0)
      .filter(p => p > 0);
    return prices.length > 0 ? Math.min(...prices) : 0;
  }

  get calculatedTotalPrice(): number {
    return this.selectedPrice * (this.quantity > 0 ? this.quantity : 1);
  }

  get calculatedTotalPriceDisplay(): string {
    return this.formatPrice(this.calculatedTotalPrice);
  }

  decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQty(): void {
    this.quantity++;
  }

  selectVariant(variant: any) {
    this.selectedVariant = variant;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }

  // Mapeo de colores a códigos HEX
  getColorCode(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'Blanco': '#FFFFFF',
      'Plateado': '#C0C0C0',
      'Negro': '#000000',
      'Gris': '#808080',
      'Azul': '#0000FF',
      'Rojo': '#FF0000',
      'Verde': '#00FF00',
      'Amarillo': '#FFFF00',
      'Naranja': '#FFA500',
      'Marrón': '#8B4513'
    };

    return colorMap[colorName] || '#CCCCCC';
  }

  contact(event?: Event): void {
    event?.stopPropagation();
    let message = `Hola, estoy interesado en el producto: *${this.product.name}*`;
    if (this.selectedVariant?.name) {
      message += ` (Opción: ${this.selectedVariant.name})`;
    }
    if (this.quantity > 1) {
      message += ` (Cantidad: ${this.quantity} unds)`;
    }
    if (this.selectedPrice > 0) {
      message += ` - Total estimado: ${this.calculatedTotalPriceDisplay}`;
    }
    message += `. ¿Podrían brindarme más información?`;
    const whatsappUrl = `https://wa.me/573006680125?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  openDetail(event?: Event): void {
    event?.stopPropagation();
    this.detailService.open(this.product);
  }

  downloadCatalog(): void {
    console.log('Descargar ficha de:', this.product.name);
  }
}