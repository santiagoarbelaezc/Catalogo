import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CatalogProduct } from '../../../models/product.model';

@Component({
  selector: 'app-catalog-short',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-short.component.html',
  styleUrl: './catalog-short.component.css'
})
export class CatalogShortComponent {
  @Input() product!: CatalogProduct;
  @Input() backgroundGradient: string = 'var(--primary-bg),var(--primary-bg)'; // Degradado por defecto (color sólido)
  @Input() reverseLayout: boolean = false; // Para invertir el orden de las secciones

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
}
