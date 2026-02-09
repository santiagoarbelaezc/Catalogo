import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogItemComponent } from '../../components/catalog/catalog-item/catalog-item.component';

import { CatalogDataService } from '../../services/catalog-data.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-districol',
  standalone: true,
  imports: [CommonModule, CatalogItemComponent, NavbarComponent],
  templateUrl: './districol.component.html',
  styleUrl: './districol.component.css'
})
export class DistricolComponent implements OnInit {
  products: CatalogProduct[] = [];

  

  constructor(private catalogDataService: CatalogDataService) {}

  ngOnInit(): void {
    this.products = this.catalogDataService.getDistricolProducts();
  }
}
