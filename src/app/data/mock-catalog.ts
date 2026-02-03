import { CatalogProduct } from '../models/product.model';
import { CatalogPage } from '../models/catalog-page.model';

// Productos Plaxtilineas
export const PLAXTILINEAS_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'POLIFLEX 2.0 La nueva generación de la espuma.',
    description: 'Característica visual DISTINTIVA Presenta una apariencia visual única e inconfundible gracias a su patrón distintivo, que evoca la solidez y sofisticación del mármol. Esta estética distintiva no es solo visualmente atractiva: funciona como una verdadera huella digital, permitiendo identificar el producto de forma rápida y segura en cualquier punto de la cadena productiva o comercial',
    material: 'Espuma Poliflex',
    variants: [],
    colors: [],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770141284/espumas_rehh6n.jpg',
        description: 'Vista general de POLIFLEX 2.0 mostrando su patrón distintivo'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770141286/ChatGPT_Image_3_feb_2026_12_33_57_p.m._zwkgnf.png',
        description: 'Detalle de la apariencia visual única e inconfundible'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770141284/espumas_rehh6n.jpg',
        description: 'Vista general de POLIFLEX 2.0 mostrando su patrón distintivo'
      }
    ],
    category: 'Plaxtilineas',
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Malla plástica multiusos',
    description: 'Perfecta para una amplia variedad de aplicaciones en jardinería, construcción, cerramiento agricolas, entre otros.',
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
    id: 3,
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
    id: 4,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    description: 'Tela de polietileno de alta densidad ideal para reducir la temperatura en diferentes espacios, ideal para cultivos, parqueaderos, construcción, sembrados, entre otros.',
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
    description: 'Protege tus objetos frágiles con nuestro plástico burbuja de alta calidad! Envoltura resistente y duradera con burbujas de aire para garantizar una protección óptima durante el transporte. Ideal para mudanzas, envíos y almacenamiento seguro.',
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
  },
  {
    id: 12,
    name: 'Clavos de acero',
    description: 'Fabricados con aceros de alto contenido de carbono, templados y revenidos para obtener la mejor combinación de alta dureza y tenacidad. Fabricados sobre pedido todo tipo de clavos de acero, en longitudes de 5/8" (16mm) hasta 4" (100 mm), en diámetros hasta 43 mm. Consúltenos sus necesidades. Se utiliza para clavar sobre muros de adobe o ladrillo y muros con mezcla sencilla y en madera muy dura, entre otros usos.',
    material: 'Acero de alto contenido de carbono',
    variants: [
      { id: 27, name: 'Longitudes de 5/8" (16mm) hasta 4" (100 mm)', available: true },
      { id: 28, name: 'Diámetros hasta 43 mm', available: true }
    ],
    colors: ['Plateado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091905/clavo-liso-1_zju455.jpg',
        description: 'Vista general de los clavos de acero mostrando su dureza y tenacidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091939/WhatsApp_Image_2026-02-02_at_11.11.06_PM_1_nn2tk1.jpg',
        description: 'Detalle de la fabricación y templado de los clavos'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091943/WhatsApp_Image_2026-02-02_at_11.11.06_PM_xyhcgn.jpg',
        description: 'Aplicación en muros de adobe y ladrillo'
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

// Productos Espumas
export const ESPUMAS_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Juego de Alcoba de Madera Pino',
    description: 'Renueva tu habitación con elegancia y confort gracias a nuestro juego de alcoba de madera pino. Este diseño único cuenta con una cama de 140x190 cm, dos mesas de noche y un tocador con cajones para brindarte la comodidad y practicidad que necesitas en tu día a día. La calidad de la madera utilizada en la fabricación de este juego de alcoba es excepcional, lo que asegura que tendrás un mueble resistente y duradero en tu hogar. Además, su diseño elegante le da un toque de sofisticación a cualquier habitación. Si buscas un descanso de calidad y una experiencia de sueño inigualable, nuestra cama de madera pino es la elección perfecta.',
    material: 'Madera Pino',
    variants: [
      { id: 27, name: 'Cama 140x190 cm', available: true },
      { id: 28, name: 'Dos mesas de noche', available: true },
      { id: 29, name: 'Tocador con cajones', available: true }
    ],
    colors: ['Natural'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074973/banner_wmjmcg.jpg',
        description: 'Vista general del juego de alcoba de madera pino mostrando elegancia y confort'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770074973/background_o184yw.png',
        description: 'Detalle del diseño único y calidad de la madera pino'
      }
      ,
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770076032/grid-3_thrlun.jpg',
        description: 'Detalle del diseño único y calidad de la madera pino'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 2,
    name: 'Colchonetas para ejercicio o gimnasio',
    description: 'Colchonetas para ejercicio o gimnasio. Espuma casata de 3 cm 50x100. Forro antifluido en cuerotex. Ideal para realizar ejercicio en casa.',
    material: 'Espuma',
    variants: [
      { id: 31, name: 'Espuma casata de 3 cm 50x100', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768954321/espumas_plasticos_productos/1768954315777-6y0xq5g.jpg',
        description: 'Vista general de las colchonetas para gimnasio mostrando su resistencia'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1768954321/espumas_plasticos_productos/1768954315786-msbuqce.jpg',
        description: 'Detalle del forro antifluido en cuerotex'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770076663/Captura_de_pantalla_2026-02-02_185712_crbp8i.png',
        description: 'Aplicación en ejercicios en casa mostrando versatilidad'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
    name: 'Almohada ortopédica cervical en espuma memory foam',
    description: '¿Sufres de dolor de cuello y hombros al despertar cada mañana? ¡No te preocupes más! Nuestra almohada ortopédica cervical en espuma memory foam es la solución que estabas buscando. Su diseño único y ergonómico se adapta perfectamente a la forma de tu cuello, brindándote el soporte y la comodidad que necesitas para dormir profundamente y despertar sintiéndote renovado. Además, su forro en tela Jacquard de alta calidad y su cremallera hacen que sea fácil de limpiar y mantener.',
    material: 'Espuma memory foam',
    variants: [
      { id: 30, name: 'Estándar', available: true }
    ],
    colors: ['Blanco'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077290/WhatsApp_Image_2026-02-02_at_7.03.56_PM_c6gilu.jpg',
        description: 'Vista general de la almohada ortopédica mostrando su diseño ergonómico'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077290/WhatsApp_Image_2026-02-02_at_7.03.56_PM_1_b80fkn.jpg',
        description: 'Detalle del forro en tela Jacquard y cremallera para fácil limpieza'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077290/WhatsApp_Image_2026-02-02_at_7.03.57_PM_zcdjg0.jpg',
        description: 'Aplicación práctica mostrando comodidad y soporte cervical'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 4,
    name: 'Colchón ortopédico PREMIUM',
    description: '¿Estás buscando un colchón que te brinde la rigidez que necesitas en tu columna vertebral? ¡Tenemos el colchón perfecto para ti! Colchón ortopédico PREMIUM está hecho de espuma cassata de alta densidad y cuenta con espumas suavizantes en ambos lados para asegurar tu comodidad. Además, su forro en tela Jacquard le da un toque de elegancia y durabilidad. Pero lo mejor de todo es que nuestro colchón viene con una garantía de 4 años sobre su estructura interna, lo que te asegura que estás haciendo una inversión duradera en tu descanso. No lo pienses más y consigue hoy mismo nuestro colchón de alta densidad para asegurarte una noche de sueño reparador y confortable.',
    material: 'Espuma cassata de alta densidad',
    variants: [
      { id: 32, name: 'Estándar', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077724/WhatsApp_Image_2026-02-02_at_7.14.04_PM_prywik.jpg',
        description: 'Vista general del colchón ortopédico PREMIUM mostrando su diseño elegante'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077716/WhatsApp_Image_2026-02-02_at_7.14.40_PM_ytrk04.jpg',
        description: 'Detalle de la espuma cassata de alta densidad y forro Jacquard'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770077717/WhatsApp_Image_2026-02-02_at_7.14.20_PM_o5osb3.jpg',
        description: 'Aplicación práctica mostrando comodidad y soporte vertebral'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 5,
    name: 'Colchonetas',
    description: 'Nuestras colchonetas disponibles en diferentes tamaños, son ideales para esta temporada que se aproxima. Desde 80 cm hasta 140 cm de ancho, por 1.90 cm de largo. Ideales para hoteles, moteles y fincas turísticas, así como para recibir visitas en casa. No esperes a que la comodidad te busque, ¡búscala tú mismo! Descubre el lujo de un descanso perfecto en tus propios términos.',
    material: 'Espuma',
    variants: [
      { id: 33, name: '80 cm - 140 cm ancho x 1.90 cm largo', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078179/WhatsApp_Image_2026-02-02_at_7.18.47_PM_wwdtye.jpg',
        description: 'Vista general de las colchonetas mostrando su comodidad y versatilidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078178/WhatsApp_Image_2026-02-02_at_7.21.45_PM_ykeov2.jpg',
        description: 'Detalle de los tamaños disponibles para diferentes necesidades'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078179/WhatsApp_Image_2026-02-02_at_7.18.47_PM_wwdtye.jpg',
        description: 'Vista general de las colchonetas mostrando su comodidad y versatilidad'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 6,
    name: 'Cojín TV triangular',
    description: 'Con nuestro cojín TV triangular, podrás disfrutar cómodamente en tu sofá o cama, dejando atrás cualquier molestia. Su forro de tela acolchada proporciona suavidad al tacto y es fácil de limpiar con su práctica cremallera. Este cojín está confeccionado con espuma de alta densidad, asegurando durabilidad y resistencia. Y lo más emocionante es que lo ofrecemos en una variedad de colores para que encuentres el perfecto para tu estilo y decoración.',
    material: 'Espuma de alta densidad',
    variants: [
      { id: 34, name: 'Triangular', available: true }
    ],
    colors: ['Variedad de colores'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078504/WhatsApp_Image_2026-02-02_at_7.27.08_PM_1_rnf3mx.jpg',
        description: 'Vista general del cojín TV triangular mostrando comodidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078511/WhatsApp_Image_2026-02-02_at_7.27.08_PM_qhiheq.jpg',
        description: 'Detalle del forro de tela acolchada y cremallera'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078503/WhatsApp_Image_2026-02-02_at_7.27.08_PM_2_gkw8em.jpg',
        description: 'Aplicación en sofá o cama mostrando versatilidad'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 7,
    name: 'Juego de Sábanas para cama',
    description: 'Dale a tu cama el toque de suavidad y frescura que se merece con nuestro Juego de Sábanas para cama! Nuestra sábanas generan suavidad y confort a la hora del descanso. Contenido del Juego de Sábanas: Sabana Sobre sabana Dos fundas de almohada de 50x75 cm Recuerda que somos fabricantes',
    material: 'Tela',
    variants: [
      { id: 35, name: 'Sabana', available: true },
      { id: 36, name: 'Sobre sabana', available: true },
      { id: 37, name: 'Dos fundas de almohada 50x75 cm', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078909/WhatsApp_Image_2026-02-02_at_7.34.17_PM_cdtiad.jpg',
        description: 'Vista general del juego de sábanas mostrando suavidad y confort'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078815/WhatsApp_Image_2026-02-02_at_7.32.25_PM_1_g6ov5g.jpg',
        description: 'Detalle de la sábana y sobre sábana'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078810/WhatsApp_Image_2026-02-02_at_7.32.25_PM_2_zqzzbi.jpg',
        description: 'Detalle de las fundas de almohada'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078806/WhatsApp_Image_2026-02-02_at_7.32.25_PM_3_kkwwbf.jpg',
        description: 'Aplicación en cama mostrando frescura y comodidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770078801/WhatsApp_Image_2026-02-02_at_7.32.26_PM_sh4hbl.jpg',
        description: 'Vista completa del conjunto de sábanas'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 8,
    name: 'Protector 100% impermeable',
    description: 'Descubra la innovación en protección para su colchón con nuestro Protector 100% impermeable. Este producto de alta calidad está confeccionado con tela resistente y bandas elásticas, asegurando una barrera impenetrable contra líquidos. Disponible en todas las medidas, desde 1.00 hasta 2.00 metros de ancho, es la opción ideal para preservar la vida útil de su colchón. No espere más, asegure la durabilidad y la higiene de su colchón hoy mismo.',
    material: 'Tela resistente',
    variants: [
      { id: 38, name: '1.00 - 2.00 metros de ancho', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770079681/WhatsApp_Image_2026-02-02_at_7.43.43_PM_ygsqrg.jpg',
        description: 'Vista general del protector impermeable mostrando protección'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770079673/WhatsApp_Image_2026-02-02_at_7.44.07_PM_ouxfnn.jpg',
        description: 'Detalle de la tela resistente y bandas elásticas'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770079673/WhatsApp_Image_2026-02-02_at_7.44.21_PM_riznq8.jpg',
        description: 'Aplicación en colchón mostrando impermeabilidad'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 9,
    name: 'Colchón CONFORT MONACO',
    description: 'Descubre la fabulosa espuma Poliflex. Un núcleo de espuma de poliuretano con un núcleo de lámina D-26 y dos láminas D-26 Penta gris. Este acolchado clásico es el supremo en comodidad y te garantiza un sueño maravilloso gracias a su espuma de alta densidad. ¡Duerme como te lo mereces con el colchón CONFORT MONACO! Tela poliéster, tejido de punto - Manijas de sujeción en laterales del colchón. Núcleo espuma Poliflex de 20 cm de espesor - pillow independientes en espuma penta espuma D-26 Altura de 30 cm Nivel de firmeza 6 sobre 10 MEDIDAS 100X190x30 cm 120x190x30 cm 140x190x30 cm 160x190x30 cm Garantia, 4 años, estructura interna',
    material: 'Espuma Poliflex',
    variants: [
      { id: 39, name: '100x190x30 cm', available: true },
      { id: 40, name: '120x190x30 cm', available: true },
      { id: 41, name: '140x190x30 cm', available: true },
      { id: 42, name: '160x190x30 cm', available: true }
    ],
    colors: ['Gris'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770080605/ChatGPT_Image_2_feb_2026_08_01_34_p.m._psx90j.png',
        description: 'Vista general del colchón CONFORT MONACO mostrando comodidad y diseño'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770080627/Captura_de_pantalla_2026-02-02_195921_kewete.png',
        description: 'Detalle de la espuma Poliflex y estructura interna'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770080605/ChatGPT_Image_2_feb_2026_08_01_34_p.m._psx90j.png',
        description: 'Vista general del colchón CONFORT MONACO mostrando comodidad y diseño'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Colchón ORTOPEDICO',
    description: 'Este colchón está fabricado con espuma flexible de poliuretano Bioflex y una lámina de casata de alta densidad, lo que lo convierte en una superficie firme y cómoda. Es especialmente adecuado para personas con problemas de columna que buscan una superficie dura que les permitan descansar cómodamente. La banda e hiladillo de colores variados realzan la presentación del colchón. Tela acolchada tejida en punto, manijas de sujeción en laterales del colchón. Espuma Poliflex 5 cm de espesor D-30 ambas caras - espuma cassata D-100 de 20 cm espesor. Altura de 20 cm. Nivel de firmeza 8/10. MEDIDAS 100X190x30 cm 120x190x30 cm 140x190x30 cm 160x190x30 cm 200x200x30 cm',
    material: 'Espuma flexible de poliuretano Bioflex',
    variants: [
      { id: 47, name: '100x190x30 cm', available: true },
      { id: 48, name: '120x190x30 cm', available: true },
      { id: 49, name: '140x190x30 cm', available: true },
      { id: 50, name: '160x190x30 cm', available: true },
      { id: 51, name: '200x200x30 cm', available: true }
    ],
    colors: ['Colores variados'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081079/WhatsApp_Image_2026-02-02_at_8.09.51_PM_uujdjl.jpg',
        description: 'Vista general del colchón ORTOPEDICO mostrando firmeza'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081078/WhatsApp_Image_2026-02-02_at_8.10.04_PM_vf4yqt.jpg',
        description: 'Detalle de la espuma Bioflex y estructura'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081079/WhatsApp_Image_2026-02-02_at_8.09.51_PM_uujdjl.jpg',
        description: 'Aplicación para problemas de columna'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 10,
    name: 'Colchoneta camping plegable',
    description: 'Descubre la comodidad en cualquier aventura con nuestra colchoneta camping plegable. Con medidas de 60x190x5 cm, Sus manijas de sujeción facilitan su transporte, y su diseño plegable la hace fácil de almacenar',
    material: 'Espuma',
    variants: [
      { id: 47, name: '60x190x5 cm', available: true }
    ],
    colors: ['Variado'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081644/Captura_de_pantalla_2026-02-02_201411_f2xkxt.png',
        description: 'Vista general de la colchoneta camping plegable mostrando comodidad en aventuras'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081629/ChatGPT_Image_2_feb_2026_08_17_27_p.m._atza3j.png',
        description: 'Detalle de las manijas de sujeción y diseño plegable'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770081644/Captura_de_pantalla_2026-02-02_201411_f2xkxt.png',
        description: 'Vista general de la colchoneta camping plegable mostrando comodidad en aventuras'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 12,
    name: 'Colchón VERONA',
    description: 'Poliflex es la mejor opción si buscas la espuma flexible más eficiente para tus colchones. Con una densidad D-30 en su núcleo y lámina Penta gris D-26, y un sistema de acolchado es el más avanzado y cómodo del mercado. ¿Deseas disfrutar de una experiencia relajante? ¡Nuestro colchón VERONA te lo garantiza! Tela jacquard de alto gramaje, tejido de punto - Manijas de sujecion en laterales del colchon. Núcleo espuma Poliflex D-30 de 23 cm espesor - pillow independiente en espuma penta espuma D-26 en una sola cara MEDIDAS 100X190x30 cm 120x190x30 cm 140x190x30 cm 160x190x30 cm 200x200x30 cm',
    material: 'Espuma Poliflex',
    variants: [
      { id: 52, name: '100X190x30 cm', available: true },
      { id: 53, name: '120x190x30 cm', available: true },
      { id: 54, name: '140x190x30 cm', available: true },
      { id: 55, name: '160x190x30 cm', available: true },
      { id: 56, name: '200x200x30 cm', available: true }
    ],
    colors: ['Gris'],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770090892/Captura_de_pantalla_2026-02-02_225051_zioybr.png',
        description: 'Vista general del colchón VERONA mostrando comodidad y diseño avanzado'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770090877/ChatGPT_Image_Feb_2_2026_10_54_04_PM_qgciou.png',
        description: 'Detalle de la espuma Poliflex D-30 y lámina Penta gris D-26'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770090892/Captura_de_pantalla_2026-02-02_225051_zioybr.png',
        description: 'Vista general del colchón VERONA mostrando comodidad y diseño avanzado'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  },
  {
    id: 13,
    name: 'Colchón Tentaflex',
    description: 'Este colchón posee un bloque de espuma naranja de alta densidad que asegura una firmeza perfecta para un sueño reparador. Pero ojo, no sacrifica el confort a la hora de dormir. Además, su cubierta en tela acolchada es tan suave que no querrás salir de la cama. ¿Lo mejor de todo? ¡Es súper sencillo de lavar gracias a la cremallera incorporada!',
    material: 'Espuma',
    variants: [
      { id: 57, name: '15 cm altura', available: true },
      { id: 58, name: '18 cm altura', available: true }
    ],
    colors: [],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091646/Captura_de_pantalla_2026-02-02_225852_gjqv0y.png',
        description: 'Vista general del colchón Tentaflex mostrando firmeza y comodidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091660/ChatGPT_Image_Feb_2_2026_11_06_50_PM_owzv1n.png',
        description: 'Detalle de la cubierta en tela acolchada y cremallera para fácil limpieza'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770091646/Captura_de_pantalla_2026-02-02_225852_gjqv0y.png',
        description: 'Vista general del colchón Tentaflex mostrando firmeza y comodidad'
      }
    ],
    category: 'Espumas',
    isNew: true,
    isFeatured: false
  }
];

// Productos Districol
export const DISTRICOL_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'colchón Sleep Well - SMV01',
    description: 'Tu descanso nunca volverá a ser el mismo. Tejido de punto de alta calidad. Memory Foam Gel Infused de 2 cm para una frescura y soporte inigualables. Sistema Pocket de 5 zonas con Foam Case de 7 cm para un descanso personalizado. Capas de espuma de alta densidad y acolchado de algodón para máximo confort. Porque un buen día empieza con una buena noche.',
    material: 'Memory Foam',
    variants: [],
    colors: [],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770093862/WhatsApp_Image_2026-02-02_at_11.03.10_PM_1_nzm0sf.jpg',
        description: 'Vista general del colchón Sleep Well mostrando calidad y confort'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770093861/WhatsApp_Image_2026-02-02_at_11.03.49_PM_1_f6qc3u.jpg',
        description: 'Detalle del Memory Foam Gel Infused y sistema Pocket'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770093861/WhatsApp_Image_2026-02-02_at_11.03.48_PM_1_hesayj.jpg',
        description: 'Vista de las capas de espuma y acolchado de algodón'
      }
    ],
    category: 'Districol',
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Pocket Bliss-SNM2308',
    description: 'Tejido de punto de alta calidad. Acolchado de poliester: para una frescura natural. Espuma troquelada de alta densidad en 3cm: que se adapta a tu forma. Espuma látex con fibras de bambú de 2cm. Espuma dura de alta densidad de 4cm. Espuma suave de 1.5 cm. Sistema pocket de 5 zonas con foam case: brindando soporte individual a cada movimiento. Relleno de algodón. Espuma para acolchar de 7cm. Regálate el descanso que tu cuerpo merece con el Pocket Bliss-SNM2308.',
    material: 'Espuma',
    variants: [],
    colors: [],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770094874/WhatsApp_Image_2026-02-02_at_11.59.24_PM_crlguk.jpg',
        description: 'Vista general del Pocket Bliss-SNM2308 mostrando calidad y confort'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770094866/WhatsApp_Image_2026-02-02_at_11.59.24_PM_1_vetdkm.jpg',
        description: 'Detalle del sistema pocket y espumas de alta densidad'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770094865/WhatsApp_Image_2026-02-02_at_11.59.25_PM_ifythe.jpg',
        description: 'Vista de las capas de espuma y acolchado'
      }
    ],
    category: 'Districol',
    isNew: true,
    isFeatured: false
  },
  {
    id: 3,
    name: 'Colchón Ágata',
    description: 'CAPACIDAD DE PESO POR PERSONA 120 KG GARANTÍA 7 AÑOS ALTURA +/-1 CM 40 CM ÁGATA Inteligente y avanzado La cubierta de este exquisito colchón se presenta con telas de alta tecnología no acolchadas y tejidos de precisión para ofrecer una experiencia superior. Siente la suavidad etérea que acaricia tu piel, mientras que el sistema de capas de espuma que componen toda la estructura permite una transición permitiendo la sensación de estar en una nube.',
    material: 'Espuma',
    variants: [],
    colors: [],
    images: [
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770136121/Captura_de_pantalla_2026-02-03_090004_ucn5ss.png',
        description: 'Vista general del colchón Ágata mostrando diseño inteligente y avanzado'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770136103/ChatGPT_Image_Feb_3_2026_09_09_46_AM_xqbwtv.png',
        description: 'Detalle de la cubierta con telas de alta tecnología y capas de espuma'
      },
      {
        url: 'https://res.cloudinary.com/dsv1gdgya/image/upload/v1770136127/Captura_de_pantalla_2026-02-03_090049_fa3wkh.png',
        description: 'Vista de la estructura permitiendo sensación de nube'
      }
    ],
    category: 'Districol',
    isNew: true,
    isFeatured: false
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