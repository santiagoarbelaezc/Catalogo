import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogProduct } from '../../../models/product.model';

@Component({
  selector: 'app-catalog-design',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-design.component.html',
  styleUrl: './catalog-design.component.css'
})
export class CatalogDesignComponent implements OnInit {
  @Input() product!: CatalogProduct | any;
  @Input() backgroundGradient: string = 'var(--primary-bg),var(--primary-bg)';
  @Input() reverseLayout: boolean = false;

  ngOnInit() {
    // AOS será inicializado globalmente en el componente padre
  }

  getBackgroundGradient(): string {
    const colors = this.backgroundGradient.split(',');
    if (colors.length === 1) {
      return colors[0].trim();
    } else if (colors.length === 2) {
      return `linear-gradient(135deg, ${colors[0].trim()}, ${colors[1].trim()})`;
    } else {
      return 'var(--primary-bg)';
    }
  }

  /**
   * Mapea nombres de colores a valores hexadecimales
   */
  getColorValue(colorName: string): string {
    const colorMap: { [key: string]: string } = {
      'Rojo': '#EF4444',
      'Azul': '#3B82F6',
      'Verde': '#22C55E',
      'Amarillo': '#FBBF24',
      'Negro': '#1F2937',
      'Blanco': '#F3F4F6',
      'Blanca': '#F3F4F6',
      'Negra': '#1F2937',
      'Naranja': '#F97316',
      'Rosa': '#EC4899',
      'Marrón': '#92400E',
      'Gris': '#9CA3AF',
      'Transparente': '#E5E7EB',
      'Multicolor': '#9333EA',
      'Múltiples': '#9333EA',
      'Plateado': '#D1D5DB'
    };

    return colorMap[colorName] || '#CCCCCC';
  }
}
