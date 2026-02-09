import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';

import { CatalogDataService } from '../../services/catalog-data.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-espumasplasticos',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, NavbarComponent],
  templateUrl: './espumasplasticos.component.html',
  styleUrl: './espumasplasticos.component.css'
})
export class EspumasplasticosComponent implements OnInit {
  products: CatalogProduct[] = [];

  

  constructor(private catalogDataService: CatalogDataService) {}

  ngOnInit(): void {
    this.products = this.catalogDataService.getEspumasProducts();
  }
}
