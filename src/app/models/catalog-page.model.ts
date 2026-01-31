import { CatalogProduct } from './product.model';

export interface CatalogPage {
  pageNumber: number;
  pageTitle: string;         // Título de la página
  pageSubtitle?: string;     // Subtítulo opcional
  introduction: string;      // Introducción/descripción de la página

  // Productos en esta página
  products: CatalogProduct[];
}