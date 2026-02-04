import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogDataService } from '../../services/catalog-data.service';
import { CatalogProduct } from '../../models/product.model';
import { CatalogShortComponent } from '../../components/catalog/catalog-short/catalog-short.component';

@Component({
  selector: 'app-catalogo-print',
  standalone: true,
  imports: [CommonModule, CatalogShortComponent],
  templateUrl: './catalogo-print.component.html',
  styleUrl: './catalogo-print.component.css'
})
export class CatalogoPrintComponent implements OnInit {
  products: CatalogProduct[] = [];

  constructor(private catalogService: CatalogDataService) {}

  ngOnInit() {
    this.products = this.catalogService.getAllCatalogProducts();
  }
}
