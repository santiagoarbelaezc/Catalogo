export interface ProductVariant {
  id?: number;
  name: string;               // Nombre de la variante (ej: "1mm", "2mm", "3mm")
  sku?: string;               // SKU código único de variante
  available: boolean;         // Si está disponible
  stock?: number;             // Stock de la variante
  price?: number;             // Precio de la variante
}