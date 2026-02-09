import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogDesignComponent } from '../../components/catalog/catalog-design/catalog-design.component';

import { CatalogDataService } from '../../services/catalog-data.service';
import { CatalogProduct } from '../../models/product.model';
import { NavbarComponent } from "../../components/shared/navbar/navbar.component";

@Component({
  selector: 'app-plaxtilineas',
  standalone: true,
  imports: [CommonModule, CatalogDesignComponent, NavbarComponent],
  templateUrl: './plaxtilineas.component.html',
  styleUrl: './plaxtilineas.component.css'
})
export class PlaxtilineasComponent implements OnInit {
  products: CatalogProduct[] = [];

 

  constructor(private catalogDataService: CatalogDataService) {}

  ngOnInit(): void {
    this.products = this.catalogDataService.getPlaxtilineasProducts();
  }
}
