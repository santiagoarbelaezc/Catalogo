import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogProduct } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  @Input() product?: CatalogProduct;
  @Input() isModal: boolean = true;
  @Output() close = new EventEmitter<void>();

  selectedImageIndex: number = 0;
  selectedVariant: any = null;
  quantity: number = 1;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    if (!this.product) {
      // Si se cargó desde la ruta /producto/:id
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.isLoading = true;
        this.productsService.getProductById(Number(id)).subscribe({
          next: (prod) => {
            this.product = prod;
            this.isLoading = false;
            this.initSelection();
          },
          error: () => {
            this.isLoading = false;
          }
        });
      }
    } else {
      this.initSelection();
    }
  }

  private initSelection(): void {
    if (!this.product) return;
    const variants = this.product.references || this.product.variants || [];
    const available = variants.filter(v => v.available);
    if (available.length > 0) {
      this.selectedVariant = available[0];
    } else if (variants.length > 0) {
      this.selectedVariant = variants[0];
    }
    this.selectedImageIndex = 0;
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

  selectImage(index: number): void {
    if (this.product?.images && index >= 0 && index < this.product.images.length) {
      this.selectedImageIndex = index;
    }
  }

  prevImage(event?: Event): void {
    event?.stopPropagation();
    if (!this.product?.images?.length) return;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }

  nextImage(event?: Event): void {
    event?.stopPropagation();
    if (!this.product?.images?.length) return;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.product.images.length;
  }

  selectVariant(variant: any): void {
    this.selectedVariant = variant;
  }

  get priceDisplay(): string | null {
    if (this.selectedVariant && this.selectedVariant.price) {
      return this.formatPrice(Number(this.selectedVariant.price));
    }
    const variants = this.product?.references || this.product?.variants || [];
    const prices = variants
      .map(v => v.price)
      .filter((p): p is number => p !== undefined && p !== null);

    if (prices.length === 0) return null;
    return this.formatPrice(Math.min(...prices));
  }

  get selectedPrice(): number {
    if (this.selectedVariant) {
      return Number(this.selectedVariant.price) || 0;
    }
    const variants = this.product?.references || this.product?.variants || [];
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

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }

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

  contactWhatsApp(): void {
    if (!this.product) return;
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
    message += `. ¿Tienen disponibilidad inmediata para cotizar?`;

    const whatsappUrl = `https://wa.me/573006680125?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  closeDetail(event?: Event): void {
    event?.stopPropagation();
    this.close.emit();
    if (!this.isModal) {
      this.router.navigate(['/catalogo']);
    }
  }

  onBackdropClick(event: MouseEvent): void {
    event.stopPropagation();
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeDetail(event);
    }
  }

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeDetail();
  }

  @HostListener('window:keydown.arrowleft')
  onArrowLeft(): void {
    this.prevImage();
  }

  @HostListener('window:keydown.arrowright')
  onArrowRight(): void {
    this.nextImage();
  }
}
