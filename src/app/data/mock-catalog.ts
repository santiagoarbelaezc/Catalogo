import { CatalogProduct } from '../models/product.model';
import { CatalogPage } from '../models/catalog-page.model';

// Productos Plaxtilineas
export const PLAXTILINEAS_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Yumbolon',
    description: 'Yumbolon es un componente estructural versátil fabricado en materiales de alta calidad, diseñado para aplicaciones industriales y arquitectónicas. Disponible en múltiples espesores y colores para adaptarse a cualquier proyecto. Su diseño innovador combina resistencia, durabilidad y estética moderna.',
    material: 'Acero Inoxidable AISI 304 / Acero al Carbono con recubrimiento',
    variants: [
      { id: 1, name: '1mm', available: true },
      { id: 2, name: '2mm', available: true },
      { id: 3, name: '3mm', available: true },
      { id: 4, name: '5mm', available: true },
      { id: 5, name: '8mm', available: true }
    ],
    colors: ['Blanco', 'Plateado', 'Negro'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769790646/WhatsApp_Image_2026-01-30_at_11.29.40_AM_jz6gfs.jpg',
        description: 'Vista frontal del Yumbolon mostrando su diseño elegante y estructura resistente'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769790646/WhatsApp_Image_2026-01-30_at_11.29.40_AM_1_hfd9cr.jpg',
        description: 'Vista lateral destacando la calidad de los materiales y el acabado profesional'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1769790955/WhatsApp_Image_2026-01-30_at_11.35.33_AM_izbdyy.jpg',
        description: 'Vista trasera mostrando los detalles técnicos y la construcción robusta'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  }
];

// Páginas del catálogo
export const CATALOG_PAGES: CatalogPage[] = [
  {
    pageNumber: 1,
    pageTitle: 'Plaxtilineas - Láminas Plásticas',
    pageSubtitle: 'Versátil y duradero',
    introduction: 'Descubre nuestras plaxtilineas, componentes premium disponibles en múltiples espesores y colores. Fabricado con materiales de alta calidad para aplicaciones industriales y arquitectónicas.',
    products: PLAXTILINEAS_PRODUCTS
  }
];

// Función para obtener productos por página
export function getProductsByPage(pageNumber: number): CatalogProduct[] {
  // Por ahora, devolver todos los productos para la página 1
  // En el futuro se puede implementar lógica más compleja
  if (pageNumber === 1) {
    return [...PLAXTILINEAS_PRODUCTS];
  }
  return [];
}

// Función para obtener página específica
export function getPage(pageNumber: number): CatalogPage | undefined {
  return CATALOG_PAGES.find(page => page.pageNumber === pageNumber);
}