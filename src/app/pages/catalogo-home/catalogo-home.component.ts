import { Component } from '@angular/core';
import { PlaxtilineasComponent } from "../plaxtilineas/plaxtilineas.component";
import { ProductsBannerComponent, BannerImage } from "../../components/catalog/products-banner/products-banner.component";
import { EspumasplasticosComponent } from "../espumasplasticos/espumasplasticos.component";
import { DistricolComponent } from "../districol/districol.component";

@Component({
  selector: 'app-catalogo-home',
  standalone: true,
  imports: [PlaxtilineasComponent, ProductsBannerComponent, EspumasplasticosComponent, DistricolComponent],
  templateUrl: './catalogo-home.component.html',
  styleUrl: './catalogo-home.component.css'
})
export class CatalogoHomeComponent {
  // Datos de ejemplo para el banner
  bannerImages: BannerImage[] = [
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770070212/cate8_uedtyk.png',
      alt: 'Productos de Plaxitlineas',
      title: 'Plaxitlineas'
    },
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768958816/banner_tnds6k.jpg',
      alt: 'Espumas Plásticas',
      title: 'Espumas & Plásticos'
    },
    {
      url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768952038/grid-4_vbom7w.jpg',
      alt: 'Districol',
      title: 'Districol'
    }
  ];
}
