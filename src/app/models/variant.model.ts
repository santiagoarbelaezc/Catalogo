export interface ProductVariant {
  id: number;
  name: string;               // Nombre de la variante (ej: "1mm", "2mm", "3mm")
  available: boolean;         // Si está disponible
  price?: number;             // Precio de la variante
}