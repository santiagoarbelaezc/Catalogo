import { Component } from '@angular/core';
import { PlaxtilineasComponent } from "../plaxtilineas/plaxtilineas.component";
import { ProductsBannerComponent, BannerImage } from "../../components/catalog/products-banner/products-banner.component";

@Component({
  selector: 'app-catalogo-home',
  standalone: true,
  imports: [PlaxtilineasComponent, ProductsBannerComponent],
  templateUrl: './catalogo-home.component.html',
  styleUrl: './catalogo-home.component.css'
})
export class CatalogoHomeComponent {
  // Datos de ejemplo para el banner
  bannerImages: BannerImage[] = [
    {
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
      alt: 'Productos de Plaxitlineas',
      title: 'Plaxitlineas'
    },
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Espumas Plásticas',
      title: 'Espumas Plásticas'
    },
    {
      url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
      alt: 'Districol',
      title: 'Districol'
    }
  ];
}
