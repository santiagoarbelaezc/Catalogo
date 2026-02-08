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
  @Input() product!: CatalogProduct;
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
}
