import { CatalogProduct } from '../models/product.model';
import { CatalogPage } from '../models/catalog-page.model';

// Productos Plaxtilineas
export const PLAXTILINEAS_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Malla plástica multiusos',
    description: 'Perfecta para una amplia variedad de aplicaciones en jardinería🪴construcción 🏗️cerramiento agricolas👩‍🌾 entre otros 👌🏾',
    material: 'Malla plástica',
    variants: [
      { id: 17, name: '1m ancho x 30m lineales', available: true },
      { id: 18, name: '1.50m ancho x 30m lineales', available: true },
      { id: 19, name: 'Abertura 15x15mm', available: true }
    ],
    colors: ['Múltiples colores'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067311/malla-img3_jxuvdm.jpg',
        description: 'Vista general de la malla plástica multiusos mostrando su versatilidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067334/WhatsApp_Image_2026-02-02_at_3.40.58_PM_q3pi72.jpg',
        description: 'Detalle de la abertura de 15x15mm y resistencia de la malla'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067310/malla-img_qwmajy.jpg',
        description: 'Aplicación en jardinería y construcción mostrando su utilidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Césped artificial verde',
    description: 'Césped artificial verde ideal para jardines, terrazas y áreas recreativas. Ofrece un aspecto natural, es resistente al desgaste y requiere mínimo mantenimiento.',
    material: 'Césped artificial',
    variants: [
      { id: 20, name: 'Estándar', available: true }
    ],
    colors: ['Verde'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067821/WhatsApp_Image_2026-02-02_at_3.40.57_PM_lxhgly.jpg',
        description: 'Vista general del césped artificial verde mostrando su aspecto natural'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067820/ChatGPT_Image_2_feb_2026_04_29_38_p.m._sf8h9m.png',
        description: 'Detalle de la textura y resistencia del césped artificial'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770067828/WhatsApp_Image_2026-02-02_at_4.27.22_PM_bkovzk.jpg',
        description: 'Aplicación en jardín o terraza mostrando su versatilidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
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
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066385/card-template3_ggxzgn.jpg',
        
        description: 'Vista trasera mostrando los detalles técnicos y la construcción robusta'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Tela Laminada Plastificada',
    description: 'Tela laminada plastificada fabricada en tejido plano de polipropileno y laminada en una cara con estabilizador U.V. Ideal para cerramientos que evitan el paso de fluidos. Ancho: 2.10 mts. Protege, cubre y garantiza durabilidad con esta solución efectiva para tus proyectos.',
    material: 'Tejido plano de polipropileno con estabilizador U.V.',
    variants: [
      { id: 6, name: '2.10 mts ancho', available: true }
    ],
    colors: ['Transparente'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1767936139/plaxtilineas_productos/1767936138484-ynetzmhhg.jpg',
        description: 'Vista general de la tela laminada plastificada mostrando su textura y resistencia UV'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1766975486/ChatGPT_Image_Dec_28_2025_08_31_29_PM_l9xemh.png',
        description: 'Detalle del tejido plano de polipropileno y el laminado UV'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1767030284/ChatGPT_Image_29_dic_2025_12_43_40_kcvskq.png',
        description: 'Aplicación práctica en cerramientos mostrando su funcionalidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 5,
    name: 'Soga Pisadora',
    description: 'La soga pisadora, también conocida como cuerda de amarre, es un componente versátil y resistente utilizado en una variedad de aplicaciones. La Soga pisadora viene de 5 mm color azul y negra carretes por 400 y 800 metros con protección UV, esta cuerda ofrece una solución confiable para una amplia gama de necesidades. Su diseño robusto y duradero la convierte en una opción ideal para actividades agrícolas, como la sujeción de cultivos o la construcción de cercas temporales, entre otros.',
    material: 'Cuerda resistente con protección UV',
    variants: [
      { id: 7, name: '5mm - 400 metros', available: true },
      { id: 8, name: '5mm - 800 metros', available: true }
    ],
    colors: ['Azul', 'Negra'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1767937150/plaxtilineas_productos/1767937149846-6r73yhs8k.jpg',
        description: 'Vista general de la soga pisadora enrollada mostrando su resistencia y durabilidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770065406/WhatsApp_Image_2026-02-02_at_3.49.44_PM_nkal6b.jpg',
        description: 'Detalle del grosor de 5mm y la protección UV de la cuerda'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770065361/WhatsApp_Image_2026-02-02_at_3.40.56_PM_s56yya.jpg',
        description: 'Aplicación agrícola mostrando la versatilidad de la soga pisadora'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    name: 'Pisos Vinílicos',
    description: 'Renueva tus espacios con estilo y practicidad con nuestros pisos vinílicos. Con una medida estándar de 1.50 de ancho, disponibles en rollos o la cantidad de metros que necesites, ¡transformar tu hogar nunca fue tan fácil! Descubre la durabilidad y variedad de diseños que ofrecemos, tenemos el piso perfecto para cada rincón de tu casa. Además, con su resistencia al agua y manchas, los pisos vinílicos son ideales para áreas de alto tráfico como la cocina o el baño.',
    material: 'Vinilo resistente al agua y manchas',
    variants: [
      { id: 9, name: '1.50m ancho - Por rollo', available: true },
      { id: 10, name: '1.50m ancho - Por metro', available: true }
    ],
    colors: ['Múltiples diseños disponibles'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770065669/piso3_f3wvva.jpg',
        description: 'Vista general de los pisos vinílicos mostrando su diseño moderno y versatilidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770065713/ChatGPT_Image_30_dic_2025_15_29_19_ihdrsm.png',
        description: 'Detalle de la textura y resistencia al agua de los pisos vinílicos'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770065713/ChatGPT_Image_Dec_31_2025_05_40_18_PM_u9shm3.png',
        description: 'Instalación en áreas de alto tráfico mostrando durabilidad y practicidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 7,
    name: 'Mantel Plástico',
    description: 'Es mantel tipo para cocina. Ideal para proteger tus superficies de cocina de manera práctica y duradera. Fácil de limpiar y mantener, perfecto para el día a día en la cocina.',
    material: 'Plástico resistente y fácil de limpiar',
    variants: [
      { id: 11, name: 'Estándar', available: true }
    ],
    colors: ['Transparente', 'Colores variados'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066290/mantel_fkopbk.jpg',
        description: 'Vista general del mantel plástico para cocina mostrando su diseño práctico'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066289/WhatsApp_Image_2026-02-02_at_4.03.07_PM_p5rfnt.jpg',
        description: 'Detalle de la textura y resistencia del mantel plástico'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066288/WhatsApp_Image_2026-02-02_at_4.03.07_PM_1_gjppza.jpg',
        description: 'Aplicación práctica en superficie de cocina mostrando facilidad de uso'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Papel Decorativo',
    description: 'Pared papel colgadura, puedes armonizar tus espacios de una manera fácil y económica. Transforma tus paredes con elegancia y estilo, creando ambientes únicos y personalizados para tu hogar o negocio.',
    material: 'Papel decorativo para paredes',
    variants: [
      { id: 12, name: 'Estándar', available: true }
    ],
    colors: ['Múltiples diseños y patrones'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066687/WhatsApp_Image_2026-02-02_at_4.09.27_PM_abpxpm.jpg',
        description: 'Vista general del papel decorativo mostrando su diseño elegante para paredes'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066737/piso-img3_stttt3.jpg',
        description: 'Detalle de la textura y calidad del papel colgadura'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066688/WhatsApp_Image_2026-02-02_at_4.09.26_PM_xl0mdl.jpg',
        description: 'Aplicación en pared mostrando cómo armoniza los espacios de manera económica'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Espumas',
    description: 'Las espumas de poliuretano se utilizan en una amplia gama de aplicaciones; tapicería y colchones, aislamiento acústico, industria automotriz. PLAXTILINEAS distribuye espumas en diferentes densidades y espesores, desde 0.05 cm hasta 15 cm de espesor, las medidas de espuma como insumo vienen de 1.00 m ancho x 2.00 m largo. Esto significa que PLAXTILINEAS tiene una amplia variedad de opciones para satisfacer las necesidades de cada cliente. Las espumas de alta densidad son ideales para aplicaciones que requieren mayor soporte y durabilidad, mientras que las espumas de baja densidad son perfectas para aplicaciones más suaves y cómodas.',
    material: 'Poliuretano de diferentes densidades',
    variants: [
      { id: 13, name: '0.05cm - 15cm espesor', available: true },
      { id: 14, name: '1.00m ancho x 2.00m largo', available: true },
      { id: 15, name: 'Alta densidad', available: true },
      { id: 16, name: 'Baja densidad', available: true }
    ],
    colors: ['Blanco', 'Negro', 'Colores variados'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066791/espuma-img2_lsvr46.jpg',
        description: 'Vista general de las espumas de poliuretano mostrando su versatilidad y aplicaciones'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066863/WhatsApp_Image_2026-02-02_at_4.13.35_PM_ehaozo.jpg',
        description: 'Detalle de la textura y densidad de las espumas para diferentes usos'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770066790/espuma-img_lah9sc.jpg',
        description: 'Aplicación en tapicería y colchones mostrando comodidad y durabilidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 9,
    name: 'Pegantes - Cemento e Incoloro Continental',
    description: 'Pegantes de alta calidad para diversas aplicaciones. Incluye pegamento cemento y pegante incoloro continental, ideales para construcción y acabados.',
    material: 'Adhesivo',
    variants: [
      { id: 20, name: 'Pegamento cemento', available: true },
      { id: 21, name: 'Pegante incoloro continental', available: true }
    ],
    colors: ['Incoloro', 'Cemento'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770068315/WhatsApp_Image_2026-01-29_at_3.47.37_PM_pbewni.jpg',
        description: 'Vista general de los pegantes mostrando su calidad y aplicaciones'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770068315/WhatsApp_Image_2026-01-29_at_3.48.19_PM_gcoa5c.jpg',
        description: 'Detalle del pegamento cemento y sus propiedades adhesivas'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770068374/WhatsApp_Image_2026-01-29_at_3.47.58_PM_y4nwjm.jpg',
        description: 'Aplicación del pegante incoloro continental en proyectos'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Polisombras',
    description: 'Tela de polietileno de alta densidad ideal para reducir la temperatura en diferentes espacios👌🏽✨ ideal para cultivos, parqueaderos, construcción, sembrados, entre otros.',
    material: 'Polietileno de alta densidad',
    variants: [
      { id: 22, name: '4m ancho x 100m lineales - 35%', available: true },
      { id: 23, name: '4m ancho x 100m lineales - 65%', available: true },
      { id: 24, name: '4m ancho x 100m lineales - 80%', available: true }
    ],
    colors: ['Negro'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770069016/Captura_de_pantalla_2026-02-02_164921_usq60a.png',
        description: 'Vista general de las polisombras mostrando su efectividad en reducción de temperatura'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770069605/Polisombras_sr49hv.webp',
        description: 'Detalle de la tela de polietileno de alta densidad y sus porcentajes de sombra'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770069588/images_e8eiir.jpg',
        description: 'Aplicación en cultivos y parqueaderos mostrando versatilidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 11,
    name: 'Plástico Burbuja',
    description: 'Protege tus objetos frágiles con nuestro plástico burbuja de alta calidad! 👌🏽📦🔒 Envoltura resistente y duradera con burbujas de aire para garantizar una protección óptima durante el transporte. 🌐 Ideal para mudanzas, envíos y almacenamiento seguro👍🏽✨',
    material: 'Plástico burbuja',
    variants: [
      { id: 25, name: 'Bola pequeña', available: true },
      { id: 26, name: 'Bola grande', available: true }
    ],
    colors: ['Transparente'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074277/rollo-plastico-burbuja-grande-empaque-envio-mudanza-5-mts-D_NQ_NP_790295-MLM25736474796_072017-F_sthsm4.jpg',
        description: 'Vista general del plástico burbuja mostrando su resistencia y protección'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074212/ChatGPT_Image_2_feb_2026_06_15_53_p.m._ittqwh.png',
        description: 'Detalle de las burbujas de aire y su efectividad en protección'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074263/OIP_jl0gts.webp',
        description: 'Aplicación en envíos y mudanzas mostrando versatilidad'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: false
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