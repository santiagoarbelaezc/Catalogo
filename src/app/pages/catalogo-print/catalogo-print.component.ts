import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { CatalogProduct } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogo-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalogo-print.component.html',
  styleUrl: './catalogo-print.component.css'
})
export class CatalogoPrintComponent implements OnInit, OnDestroy {
  products: CatalogProduct[] = [];
  productPages: CatalogProduct[][] = [];
  brandName: string = 'PLAXTILINEAS';
  brandKey: string = 'plaxtilineas';
  currentDate: string = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Estado del autoscroll de 25 segundos para precargar todas las imágenes
  isAutoScrolling = false;
  scrollProgress = 0;
  secondsRemaining = 25;
  private rafId: number | null = null;
  private printTimeoutId: any = null;
  private hasTriggeredPrint = false;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products: any[]) => {
        if (products && Array.isArray(products)) {
          const visibleProducts = products.filter(p => this.productsService.hasValidPrice(p));
          const brandParam = this.route.snapshot.queryParamMap.get('brand');

          if (brandParam) {
            this.brandName = brandParam.toUpperCase();
            this.brandKey = brandParam.toLowerCase();
            this.products = visibleProducts
              .filter(p =>
                p.category?.toLowerCase() === brandParam.toLowerCase() ||
                p.marca?.toLowerCase() === brandParam.toLowerCase()
              )
              .sort((a, b) => a.name.localeCompare(b.name));
          } else {
            this.brandName = 'PLAXTILINEAS';
            this.brandKey = 'plaxtilineas';
            this.products = visibleProducts
              .filter(p => p.category?.toLowerCase() === 'plaxtilineas')
              .sort((a, b) => a.name.localeCompare(b.name));
          }

          this.buildProductPages(9);

          // Esperar un tick para que el DOM renderice todas las tarjetas y arrancar el autoscroll de 25s
          setTimeout(() => {
            this.startAutoScrollAndPrint(25000);
          }, 350);
        }
      },
      error: (error) => {
        console.error('Error cargando productos para PDF:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.cancelAutoScroll();
  }

  private cancelAutoScroll(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.printTimeoutId) {
      clearTimeout(this.printTimeoutId);
      this.printTimeoutId = null;
    }
  }

  private startAutoScrollAndPrint(durationMs: number): void {
    this.cancelAutoScroll();
    this.isAutoScrolling = true;
    this.scrollProgress = 0;
    this.secondsRemaining = Math.ceil(durationMs / 1000);

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / durationMs);
      this.scrollProgress = Math.round(ratio * 100);
      this.secondsRemaining = Math.max(0, Math.ceil((durationMs - elapsed) / 1000));

      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      window.scrollTo(0, maxScroll * ratio);

      if (ratio < 1) {
        this.rafId = requestAnimationFrame(step);
      } else {
        this.rafId = null;
        this.isAutoScrolling = false;
        window.scrollTo({ top: 0, behavior: 'auto' });
        this.printTimeoutId = setTimeout(() => {
          this.triggerPrint();
        }, 400);
      }
    };

    this.rafId = requestAnimationFrame(step);
  }

  triggerPrint(): void {
    if (this.hasTriggeredPrint) return;
    this.hasTriggeredPrint = true;
    this.cancelAutoScroll();
    this.isAutoScrolling = false;
    window.scrollTo(0, 0);
    window.print();
  }

  private buildProductPages(perPage: number): void {
    this.productPages = [];
    for (let i = 0; i < this.products.length; i += perPage) {
      this.productPages.push(this.products.slice(i, i + perPage));
    }
  }

  getProductMinPrice(product: CatalogProduct): number {
    return this.productsService.getProductMinPrice(product);
  }

  getProductVariants(product: CatalogProduct): any[] {
    return product?.references || product?.variants || [];
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(price);
  }
}
