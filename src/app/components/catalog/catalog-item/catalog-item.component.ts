import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CatalogProduct } from '../../../models/product.model';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  @Input() product!: CatalogProduct;
  @Input() backgroundGradient: string = 'var(--primary-bg),var(--primary-bg)'; // Degradado por defecto (color sólido)
  @Input() reverseLayout: boolean = false; // Para invertir el orden de las secciones

  selectedVariant: any = null;
  quantity: number = 1;

  ngOnInit() {
    const variants = this.product.references || this.product.variants || [];
    const availableVariants = variants.filter(v => v.available);
    if (availableVariants.length > 0) {
      this.selectedVariant = availableVariants[0];
    } else if (variants.length > 0) {
      this.selectedVariant = variants[0];
    }
  }

  get priceDisplay(): string | null {
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

  getBackgroundGradient(): string {
    const colors = this.backgroundGradient.split(',');
    if (colors.length === 1) {
      // Si solo hay un color, devolver color sólido
      return colors[0].trim();
    } else if (colors.length === 2) {
      // Si hay dos colores, crear degradado
      return `linear-gradient(to bottom, ${colors[0].trim()}, ${colors[1].trim()})`;
    } else {
      // Fallback por defecto
      return 'var(--primary-bg)';
    }
  }

  contact(): void {
    // Lógica para contacto vía WhatsApp
    const message = `Hola, estoy interesado en el producto: ${this.product.name}. ¿Podrían darme más información?`;
    const whatsappUrl = `https://wa.me/3006680125?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  downloadCatalog(): void {
    // Lógica para descargar ficha técnica
    console.log('Descargar ficha de:', this.product.name);
    // Implementar descarga real aquí
  }
}