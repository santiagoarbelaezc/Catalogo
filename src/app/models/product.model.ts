import { ProductVariant } from './variant.model';

export interface ProductImage {
  url: string;
  description: string;
}

export interface CatalogProduct {
  id: number;
  name: string;               // Nombre del producto
  description: string;        // Descripción del producto
  material: string;           // Material del producto

  // Referencias (antes variantes)
  references?: ProductVariant[];

  // Opciones de colores (texto)
  options?: string;           // Colores disponibles en texto

  // Colores disponibles (array - para compatibilidad)
  colors: string[];           // Array de colores disponibles

  // Variantes (para compatibilidad con productos antiguos)
  variants?: ProductVariant[];

  // Imágenes
  images: ProductImage[];     // Array de imágenes del producto con descripciones

  // Información adicional básica
  category: string;           // Categoría del producto
  isNew?: boolean;            // Si es producto nuevo
  isFeatured?: boolean;       // Si es producto destacado

  // Marca y gramaje
  marca?: string;             // Marca del producto
  gramaje?: string;           // Gramaje del producto
  brandIconUrl?: string;      // URL del icono de la marca
}