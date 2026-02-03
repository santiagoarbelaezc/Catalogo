import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';
import { ProductsBannerComponent, BannerImage } from '../../components/catalog/products-banner/products-banner.component';
import { CatalogDataService } from '../../services/catalog-data.service';
import { CatalogProduct } from '../../models/product.model';

@Component({
  selector: 'app-districol',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, ProductsBannerComponent],
  templateUrl: './districol.component.html',
  styleUrl: './districol.component.css'
})
export class DistricolComponent implements OnInit {
  products: CatalogProduct[] = [];

  // Imágenes del banner
  bannerImages: BannerImage[] = [
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769820937/WhatsApp_Image_2026-01-30_at_7.54.15_PM_vkpc5x.jpg',
      alt: 'Districol - Producto destacado',
      title: 'Innovación en Districol'
    },
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769820932/WhatsApp_Image_2026-01-30_at_7.54.15_PM_1_vs3wm9.jpg',
      alt: 'Districol - Calidad superior',
      title: 'Calidad Superior'
    },
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769820930/WhatsApp_Image_2026-01-30_at_7.54.15_PM_2_jexpc8.jpg',
      alt: 'Districol - Tecnología avanzada',
      title: 'Tecnología Avanzada'
    },
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769820929/WhatsApp_Image_2026-01-30_at_7.54.16_PM_bjwwg1.jpg',
      alt: 'Districol - Soluciones integrales',
      title: 'Soluciones Integrales'
    }
  ];

  constructor(private catalogDataService: CatalogDataService) {}

  ngOnInit(): void {
    this.products = this.catalogDataService.getDistricolProducts();
  }
}
