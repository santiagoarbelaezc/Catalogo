import { Injectable } from '@angular/core';
import { CatalogProduct } from '../models/product.model';
import { CatalogPage } from '../models/catalog-page.model';
import { 
  PLAXTILINEAS_PRODUCTS, 
  ESPUMAS_PRODUCTS,
  DISTRICOL_PRODUCTS,
  CATALOG_PAGES, 
  getProductsByPage, 
  getPage 
} from '../data/mock-catalog';

@Injectable({
  providedIn: 'root'
})
export class CatalogDataService {
  
  // Obtener todos los productos
  getAllProducts(): CatalogProduct[] {
    return [...PLAXTILINEAS_PRODUCTS];
  }
  
  // Obtener productos por página
  getProductsForPage(pageNumber: number): CatalogProduct[] {
    // Por ahora, devolver todos los productos para la página 1
    // En el futuro se puede implementar lógica más compleja
    if (pageNumber === 1) {
      return [...PLAXTILINEAS_PRODUCTS];
    }
    return [];
  }
  
  // Obtener información de una página específica
  getPageInfo(pageNumber: number): CatalogPage | undefined {
    return getPage(pageNumber);
  }
  
  // Obtener producto por ID
  getProductById(id: number): CatalogProduct | undefined {
    return PLAXTILINEAS_PRODUCTS.find(product => product.id === id);
  }
  
  // Obtener todas las páginas
  getAllPages(): CatalogPage[] {
    return [...CATALOG_PAGES];
  }
  
  // Obtener variantes de un producto
  getProductVariants(productId: number) {
    const product = this.getProductById(productId);
    return product?.variants || [];
  }
  
  // Buscar productos por categoría
  getProductsByCategory(category: string): CatalogProduct[] {
    return PLAXTILINEAS_PRODUCTS.filter(product => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Obtener productos destacados
  getFeaturedProducts(): CatalogProduct[] {
    return PLAXTILINEAS_PRODUCTS.filter(product => product.isFeatured);
  }
  
  // Obtener productos nuevos
  getNewProducts(): CatalogProduct[] {
    return PLAXTILINEAS_PRODUCTS.filter(product => product.isNew);
  }
  
  // Obtener productos de Plaxtilineas
  getPlaxtilineasProducts(): CatalogProduct[] {
    return [...PLAXTILINEAS_PRODUCTS];
  }
  
  // Obtener productos de Espumas
  getEspumasProducts(): CatalogProduct[] {
    return [...ESPUMAS_PRODUCTS];
  }
  
  // Obtener productos de Districol
  getDistricolProducts(): CatalogProduct[] {
    return [...DISTRICOL_PRODUCTS];
  }
}
