import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CatalogProduct } from '../../../models/product.model';

@Component({
  selector: 'app-catalog-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-item.component.html',
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent {
  @Input() product!: CatalogProduct;
  @Input() backgroundGradient: string = 'var(--primary-bg),var(--primary-bg)'; // Degradado por defecto (color sólido)
  @Input() reverseLayout: boolean = false; // Para invertir el orden de las secciones

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
    // Lógica para contacto
    console.log('Contactar sobre producto:', this.product.name);
    // Aquí puedes implementar redirección a formulario de contacto
    window.location.href = '/contacto?producto=' + encodeURIComponent(this.product.name);
  }

  downloadCatalog(): void {
    // Lógica para descargar ficha técnica
    console.log('Descargar ficha de:', this.product.name);
    // Implementar descarga real aquí
  }
}