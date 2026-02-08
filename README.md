<div align="center">

# 🛍️ Catálogo Digital - Plaxtilíneas

### 📱 Catálogo Digital Móvil de Última Generación

[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![AWS](https://img.shields.io/badge/AWS-Production-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

**Solución moderna para visualización de productos empresariales**  
*Plataforma Angular optimizada para dispositivos móviles con diseño innovador y experiencia de usuario intuitiva*

[🚀 Demo en Vivo](https://catalogo-6113e.web.app) • [📖 Documentación](#-tabla-de-contenidos) • [🐛 Reportar Bug](https://github.com/tu-usuario/catalogo-digital/issues)

---

</div>

## 📋 Tabla de Contenidos

- [📝 Descripción del Proyecto](#-descripción-del-proyecto)
- [🏢 Empresas Beneficiadas](#-empresas-beneficiadas)
- [✨ Características Principales](#-características-principales)
- [🏗️ Arquitectura del Proyecto](#️-arquitectura-del-proyecto)
- [💻 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📱 Vistas y Funcionalidades](#-vistas-y-funcionalidades)
- [🖨️ Generación de PDF](#️-generación-de-pdf)
- [⚡ Optimización Móvil](#-optimización-móvil)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [👨‍💻 Autor](#-autor)
- [📄 Licencia](#-licencia)

---

## 📝 Descripción del Proyecto

**Catálogo Digital** es una aplicación web progresiva (PWA) desarrollada en **Angular** con un enfoque **mobile-first**, diseñada específicamente para optimizar la visualización de productos en dispositivos móviles. 

La plataforma permite a las empresas del sector industrial mostrar sus productos de manera atractiva, profesional e interactiva, facilitando la conexión directa con clientes potenciales a través de múltiples canales de comunicación.

### 🎯 Objetivo Principal

Transformar la experiencia tradicional de catálogos físicos en una solución digital moderna, accesible desde cualquier dispositivo, con capacidades de exportación a PDF y conectividad directa con canales de venta.

---

## 🏢 Empresas Beneficiadas

<table>
<tr>
<td align="center" width="33%">

### 🔷 Plaxtilíneas
**Soluciones en Plásticos**  
Productos innovadores para la industria

</td>
<td align="center" width="33%">

### 🟦 Espumas y Plásticos
**Materiales Industriales**  
Distribución especializada de espumas

</td>
<td align="center" width="33%">

### 🔶 Districol
**Distribución Especializada**  
Insumos y materiales industriales

</td>
</tr>
</table>

---

## ✨ Características Principales

### 📸 Visualización Avanzada de Productos

```
✅ Galería de imágenes de alta calidad
✅ Zoom interactivo en productos
✅ Vista rápida de detalles
✅ Categorización inteligente por empresa
✅ Filtros dinámicos y búsqueda en tiempo real
```

### 📱 Experiencia Mobile-First

```
✅ Diseño 100% responsive
✅ Navegación optimizada para touch
✅ Carga rápida en conexiones móviles
✅ Interface intuitiva y minimalista
✅ Gestos naturales (swipe, pinch-to-zoom)
```

### 🔗 Conectividad Empresarial

```
✅ Redirección a páginas web oficiales
✅ Contacto directo vía WhatsApp
✅ Información de contacto siempre visible
✅ Localización de sucursales
✅ Enlaces a redes sociales
```

### 🎨 Diseño Innovador

```
✅ UI/UX moderna y atractiva
✅ Animaciones fluidas con AOS (Animate On Scroll)
✅ Paleta de colores profesional por empresa
✅ Tipografía optimizada para legibilidad
✅ Modo claro con alto contraste
```

### 🖨️ Exportación de Catálogo a PDF

```
✅ Generación de PDF del catálogo completo
✅ Selección personalizada de productos
✅ Plantillas profesionales predefinidas
✅ Compresión optimizada para compartir
✅ Preservación del diseño y formato
✅ Impresión directa desde el navegador
```

---

## 🏗️ Arquitectura del Proyecto

### 📊 Estrategias de Despliegue

<table>
<thead>
<tr>
<th>Entorno</th>
<th>Plataforma</th>
<th>Propósito</th>
<th>Características</th>
</tr>
</thead>
<tbody>
<tr>
<td>🚀 <strong>Producción</strong></td>
<td>AWS (Amazon Web Services)</td>
<td>Entorno estable para clientes finales</td>
<td>
• Alta disponibilidad 99.9%<br>
• Escalabilidad automática<br>
• CDN global (CloudFront)<br>
• SSL/TLS incluido
</td>
</tr>
<tr>
<td>🧪 <strong>Desarrollo</strong></td>
<td>Firebase (Google Cloud)</td>
<td>Testing y versiones preliminares</td>
<td>
• Despliegue en segundos<br>
• Hosting estático optimizado<br>
• Preview de features<br>
• Rollback instantáneo
</td>
</tr>
<tr>
<td>🔬 <strong>Beta Testing</strong></td>
<td>Firebase Hosting + Functions</td>
<td>Validación con usuarios controlados</td>
<td>
• URLs específicas de versión<br>
• Analytics integrado<br>
• A/B testing<br>
• Feedback en tiempo real
</td>
</tr>
</tbody>
</table>

### 🏛️ Patrón de Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTACIÓN                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Pages     │  │  Components │  │  Directives │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────┤
│                    LÓGICA DE NEGOCIO                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │  Services   │  │    Utils    │  │   Guards    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
├─────────────────────────────────────────────────────────┤
│                        DATOS                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Models    │  │  Data (JSON)│  │   Assets    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Tecnologías Utilizadas

### 🎯 Core Technologies

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| ![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular&logoColor=white) | 17+ | Framework principal |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white) | 5.0+ | Lenguaje de programación |
| ![RxJS](https://img.shields.io/badge/RxJS-7+-B7178C?logo=reactivex&logoColor=white) | 7+ | Programación reactiva |

### 🎨 UI/UX Libraries

| Librería | Propósito |
|----------|-----------|
| **AOS** (Animate On Scroll) | Animaciones al hacer scroll |
| **CSS3** | Estilos modernos y responsive |
| **Google Fonts** | Tipografía profesional |

### 🖨️ PDF Generation

| Librería | Propósito |
|----------|-----------|
| **jsPDF** | Generación de documentos PDF |
| **html2canvas** | Captura de contenido HTML |

### 🛠️ Herramientas de Desarrollo

| Herramienta | Versión | Uso |
|------------|---------|-----|
| **Node.js** | 18+ | Entorno de ejecución |
| **npm** | 9+ | Gestión de paquetes |
| **Angular CLI** | 17+ | Herramientas de desarrollo |
| **TypeScript Compiler** | 5.0+ | Compilación de código |

### ☁️ Deployment & Hosting

| Plataforma | Propósito |
|-----------|-----------|
| **AWS S3** | Almacenamiento de archivos |
| **AWS CloudFront** | CDN global |
| **Firebase Hosting** | Beta & Testing |

---

## 📁 Estructura del Proyecto

### 🗂️ Raíz del Proyecto

```
📦 catalogo-digital/
├── 📁 .angular/              # Configuración de compilación Angular
├── 📁 .firebase/             # Configuración de Firebase
├── 📁 .vscode/               # Configuración del editor VS Code
├── 📁 dist/                  # Build de producción
│   └── 📁 catalogo/
│       └── 📁 browser/       # Archivos compilados para navegador
├── 📁 node_modules/          # Dependencias del proyecto (gitignored)
├── 📁 public/                # Recursos públicos estáticos
├── 📁 src/                   # 🎯 Código fuente principal
├── 📄 .editorconfig          # Configuración del editor
├── 📄 .firebaserc            # Configuración de proyectos Firebase
├── 📄 .gitignore             # Archivos ignorados por Git
├── 📄 angular.json           # Configuración de Angular CLI
├── 📄 firebase.json          # Configuración de Firebase Hosting
├── 📄 package-lock.json      # Bloqueo de versiones de dependencias
├── 📄 package.json           # Dependencias y scripts del proyecto
├── 📄 README.md              # 📖 Este archivo
├── 📄 tsconfig.app.json      # Configuración TypeScript para la app
├── 📄 tsconfig.json          # Configuración base de TypeScript
└── 📄 tsconfig.spec.json     # Configuración TypeScript para tests
```

### 📂 Directorio `/src` (Código Fuente)

```
📁 src/
├── 📁 app/                   # 🎯 Aplicación principal Angular
├── 📁 assets/                # 🖼️ Recursos multimedia
│   ├── 📁 images/           # Imágenes de productos
│   ├── 📁 icons/            # Iconos de la aplicación
│   └── 📁 logos/            # Logos de empresas
├── 📄 index.html             # 📄 Página HTML principal
├── 📄 main.ts                # 🚀 Punto de entrada de la aplicación
├── 📄 print-styles.css       # 🖨️ Estilos para impresión
└── 📄 styles.css             # 🎨 Estilos globales
```

### 🎯 Directorio `/src/app` (Aplicación Angular)

```
📁 app/
├── 📁 components/            # 🧩 Componentes reutilizables
│   ├── 📁 catalog/          # Componentes del catálogo
│   │   ├── 📁 catalog-card/
│   │   ├── 📁 catalog-filter/
│   │   ├── 📁 catalog-grid/
│   │   ├── 📁 catalog-list/
│   │   ├── 📁 catalog-print/     # 🖨️ NUEVO: Componente de impresión PDF
│   │   └── 📁 catalog-short/
│   ├── 📁 layout/           # Estructura de página
│   │   ├── 📁 footer/
│   │   └── 📁 header/
│   ├── 📁 shared/           # Componentes compartidos
│   │   ├── 📁 loading-spinner/
│   │   └── 📁 navbar/
│   └── 📁 themes/           # Temas visuales por empresa
│
├── 📁 data/                  # 💾 Datos estáticos y mock data
│   ├── 📄 districol-products.json
│   ├── 📄 espumas-products.json
│   └── 📄 plaxtilineas-products.json
│
├── 📁 directives/            # 🎯 Directivas personalizadas de Angular
│   ├── 📄 lazy-load.directive.ts
│   └── 📄 scroll-reveal.directive.ts
│
├── 📁 models/                # 📊 Interfaces y modelos TypeScript
│   ├── 📄 product.model.ts
│   ├── 📄 category.model.ts
│   ├── 📄 company.model.ts
│   └── 📄 filter.model.ts
│
├── 📁 pages/                 # 📱 Páginas/Vistas principales
│   ├── 📁 catalogo-home/    # Página de inicio
│   ├── 📁 catalogo-print/   # 🖨️ NUEVO: Vista de impresión de catálogo
│   ├── 📁 districol/        # Catálogo Districol
│   ├── 📁 espumasplasticos/ # Catálogo Espumas y Plásticos
│   └── 📁 plaxtilineas/     # Catálogo Plaxtilíneas
│
├── 📁 services/              # 🔧 Servicios e inyección de dependencias
│   ├── 📄 product.service.ts
│   ├── 📄 filter.service.ts
│   ├── 📄 pdf-generator.service.ts   # 🖨️ NUEVO: Servicio de generación PDF
│   └── 📄 analytics.service.ts
│
├── 📁 utils/                 # 🛠️ Utilidades y helpers
│   ├── 📄 format.utils.ts
│   ├── 📄 validation.utils.ts
│   └── 📄 pdf.utils.ts       # 🖨️ NUEVO: Utilidades para PDF
│
├── 📄 app.component.css      # Estilos del componente raíz
├── 📄 app.component.html     # Template del componente raíz
├── 📄 app.component.spec.ts  # Tests del componente raíz
├── 📄 app.component.ts       # 🎯 Lógica del componente raíz
├── 📄 app.config.ts          # ⚙️ Configuración de la aplicación
└── 📄 app.routes.ts          # 🛣️ Rutas de la aplicación
```

### 🧩 Detalle del Directorio `/src/app/components`

```
📁 components/
├── 📁 catalog/               # Componentes del catálogo de productos
│   ├── 📁 catalog-card/     # Tarjeta de producto individual
│   ├── 📁 catalog-filter/   # Filtros y ordenamiento
│   ├── 📁 catalog-grid/     # Vista en cuadrícula
│   ├── 📁 catalog-list/     # Vista en lista
│   ├── 📁 catalog-print/    # 🖨️ Generación de PDF del catálogo
│   │   ├── 📄 catalog-print.component.ts
│   │   ├── 📄 catalog-print.component.html
│   │   ├── 📄 catalog-print.component.css
│   │   └── 📄 catalog-print.component.spec.ts
│   └── 📁 catalog-short/    # Vista compacta de productos
│
├── 📁 layout/                # Componentes de estructura
│   ├── 📁 footer/           # Pie de página
│   └── 📁 header/           # Encabezado
│
├── 📁 shared/                # Componentes compartidos
│   ├── 📁 loading-spinner/  # Indicador de carga
│   └── 📁 navbar/           # Barra de navegación
│
└── 📁 themes/                # Temas y personalizaciones visuales
    ├── 📄 theme-districol.css
    ├── 📄 theme-espumas.css
    └── 📄 theme-plaxtilineas.css
```

### 📄 Detalle del Directorio `/src/app/pages`

```
📁 pages/
├── 📁 catalogo-home/         # 🏠 Página principal del catálogo
│   ├── 📄 catalogo-home.component.ts
│   ├── 📄 catalogo-home.component.html
│   ├── 📄 catalogo-home.component.css
│   └── 📄 catalogo-home.component.spec.ts
│
├── 📁 catalogo-print/        # 🖨️ Vista de impresión/exportación PDF
│   ├── 📄 catalogo-print.component.ts
│   ├── 📄 catalogo-print.component.html
│   ├── 📄 catalogo-print.component.css
│   └── 📄 catalogo-print.component.spec.ts
│
├── 📁 districol/             # Catálogo de Districol
│   ├── 📄 districol.component.ts
│   ├── 📄 districol.component.html
│   ├── 📄 districol.component.css
│   └── 📄 districol.component.spec.ts
│
├── 📁 espumasplasticos/      # Catálogo de Espumas y Plásticos
│   ├── 📄 espumasplasticos.component.ts
│   ├── 📄 espumasplasticos.component.html
│   ├── 📄 espumasplasticos.component.css
│   └── 📄 espumasplasticos.component.spec.ts
│
└── 📁 plaxtilineas/          # Catálogo de Plaxtilíneas
    ├── 📄 plaxtilineas.component.ts
    ├── 📄 plaxtilineas.component.html
    ├── 📄 plaxtilineas.component.css
    └── 📄 plaxtilineas.component.spec.ts
```

---

### 📊 Resumen de Arquitectura por Responsabilidad

<table>
<thead>
<tr>
<th>Categoría</th>
<th>Descripción</th>
<th>Ubicación</th>
<th>Ejemplos</th>
</tr>
</thead>
<tbody>
<tr>
<td>🎨 <strong>UI Components</strong></td>
<td>Componentes visuales reutilizables</td>
<td><code>/src/app/components</code></td>
<td>catalog-card, navbar, footer</td>
</tr>
<tr>
<td>📱 <strong>Pages</strong></td>
<td>Vistas principales de la aplicación</td>
<td><code>/src/app/pages</code></td>
<td>catalogo-home, districol, catalog-print</td>
</tr>
<tr>
<td>🔧 <strong>Services</strong></td>
<td>Lógica de negocio y comunicación</td>
<td><code>/src/app/services</code></td>
<td>product.service, pdf-generator.service</td>
</tr>
<tr>
<td>📦 <strong>Models</strong></td>
<td>Tipado e interfaces TypeScript</td>
<td><code>/src/app/models</code></td>
<td>product.model, category.model</td>
</tr>
<tr>
<td>🎯 <strong>Directives</strong></td>
<td>Directivas Angular personalizadas</td>
<td><code>/src/app/directives</code></td>
<td>lazy-load, scroll-reveal</td>
</tr>
<tr>
<td>💾 <strong>Data</strong></td>
<td>Información estática y datasets</td>
<td><code>/src/app/data</code></td>
<td>productos JSON por empresa</td>
</tr>
<tr>
<td>🛠️ <strong>Utils</strong></td>
<td>Funciones auxiliares y helpers</td>
<td><code>/src/app/utils</code></td>
<td>format.utils, pdf.utils</td>
</tr>
</tbody>
</table>

---

## 🚀 Instalación y Configuración

### 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior) - [Descargar](https://nodejs.org/)
- **npm** (versión 9 o superior) - Incluido con Node.js
- **Angular CLI** (versión 17 o superior)

```bash
npm install -g @angular/cli
```

### 🔧 Instalación Paso a Paso

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/catalogo-digital.git
cd catalogo-digital
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno** (si aplica)

```bash
# Crear archivo de entorno
cp src/environments/environment.example.ts src/environments/environment.ts

# Editar con tus credenciales
nano src/environments/environment.ts
```

4. **Ejecutar en modo desarrollo**

```bash
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

5. **Build para producción**

```bash
ng build --configuration production
```

Los archivos compilados estarán en `dist/catalogo/browser/`

---

### 🌐 Despliegue

#### Firebase Hosting (Beta/Testing)

```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login en Firebase
firebase login

# Inicializar proyecto
firebase init hosting

# Desplegar
firebase deploy
```

#### AWS S3 + CloudFront (Producción)

```bash
# Compilar para producción
ng build --configuration production

# Sincronizar con S3
aws s3 sync dist/catalogo/browser/ s3://tu-bucket-name --delete

# Invalidar caché de CloudFront
aws cloudfront create-invalidation --distribution-id TU_DISTRIBUTION_ID --paths "/*"
```

---

## 📱 Vistas y Funcionalidades

### 1. 🏠 Página de Inicio (`/catalogo-home`)

**Características:**
- Banner corporativo rotativo
- Acceso rápido por empresa (3 tarjetas)
- Búsqueda inteligente global
- Categorías destacadas
- Animaciones de entrada (AOS)

**Tecnologías:**
- Angular Routing
- Lazy Loading de imágenes
- Responsive Grid System

---

### 2. 📦 Catálogo por Empresa (`/plaxtilineas`, `/districol`, `/espumasplasticos`)

**Características:**
- Filtrado por categorías/subcategorías
- Ordenamiento personalizado (precio, nombre, popularidad)
- Vista grid/list adaptativa
- Paginación optimizada
- Búsqueda dentro del catálogo

**Componentes utilizados:**
```
- catalog-filter
- catalog-grid / catalog-list
- catalog-card
```

---

### 3. 🔍 Detalle de Producto (Modal/Página)

**Características:**
- Galería de imágenes con swipe
- Especificaciones técnicas
- Precios y disponibilidad
- Botones de acción directa (WhatsApp, Web)
- Productos relacionados

**Interacciones:**
- Zoom con pinch gesture
- Navegación por swipe
- Compartir producto

---

### 4. 📞 Contacto Rápido

**Características:**
- Botón WhatsApp flotante (sticky)
- Formulario de consulta
- Enlaces a redes sociales
- Mapa de ubicación (Google Maps)
- Información de contacto

---

### 5. 🖨️ **NUEVO: Vista de Impresión** (`/catalogo-print`)

**Características principales:**
- Generación de PDF profesional del catálogo completo
- Selección personalizada de productos a imprimir
- Múltiples plantillas de diseño predefinidas
- Preview antes de generar el PDF
- Optimización automática de imágenes

**Funcionalidades avanzadas:**
```
✅ Selección múltiple de productos
✅ Filtrado por empresa/categoría
✅ Personalización de portada (logo, colores)
✅ Inclusión/exclusión de precios
✅ Formato A4, Carta, o personalizado
✅ Compresión inteligente de imágenes
✅ Tabla de contenidos automática
✅ Numeración de páginas
✅ Encabezado y pie de página personalizables
```

**Componente principal:**
```typescript
// src/app/pages/catalogo-print/catalogo-print.component.ts

export class CatalogoPrintComponent {
  // Métodos principales
  generatePDF(): void { }
  selectProducts(): void { }
  customizeTemplate(): void { }
  previewPDF(): void { }
}
```

**Servicio de generación PDF:**
```typescript
// src/app/services/pdf-generator.service.ts

export class PdfGeneratorService {
  generateCatalogPDF(products: Product[], options: PDFOptions): Promise<Blob>
  compressImages(images: string[]): Promise<string[]>
  createCoverPage(company: Company): jsPDF
  addProductPages(pdf: jsPDF, products: Product[]): jsPDF
}
```

**Tecnologías utilizadas:**
- **jsPDF**: Generación de documentos PDF
- **html2canvas**: Captura de elementos HTML
- **Canvas API**: Manipulación de imágenes
- **File Saver**: Descarga de archivos

**Flujo de generación:**
```
1. Usuario selecciona productos
2. Elige plantilla y opciones
3. Preview en pantalla
4. Sistema genera PDF con:
   - Portada personalizada
   - Índice de productos
   - Páginas de productos (2-4 por página)
   - Información de contacto
5. Descarga automática del archivo
```

---

## ⚡ Optimización Móvil

### 🚀 Performance

<table>
<tr>
<td>

**Optimizaciones Implementadas**

✅ **Images Lazy Loading**  
Carga diferida de imágenes

✅ **Component On-Demand**  
Componentes bajo demanda

✅ **Assets Minification**  
Minificación de recursos

✅ **Strategic Caching**  
Caché inteligente de recursos

✅ **Code Splitting**  
División de código por rutas

✅ **Tree Shaking**  
Eliminación de código no usado

</td>
<td>

**Métricas Objetivo**

📊 **Lighthouse Score**: 90+  
📊 **First Contentful Paint**: < 1.5s  
📊 **Time to Interactive**: < 3.5s  
📊 **Largest Contentful Paint**: < 2.5s  
📊 **Cumulative Layout Shift**: < 0.1  
📊 **Total Blocking Time**: < 300ms

</td>
</tr>
</table>

### 📱 UX Mobile

```
✅ Touch-friendly buttons (mínimo 44px × 44px)
✅ Swipe gestures para galerías
✅ Fast tap responses (sin delay de 300ms)
✅ Offline basic support (Service Workers)
✅ Pull-to-refresh en listas
✅ Haptic feedback (vibración táctil)
✅ Orientación adaptativa (portrait/landscape)
```

### 🎨 Responsive Design Breakpoints

```css
/* Mobile First Approach */

/* Extra Small Devices (Phones) */
@media (max-width: 575.98px) { }

/* Small Devices (Landscape Phones) */
@media (min-width: 576px) and (max-width: 767.98px) { }

/* Medium Devices (Tablets) */
@media (min-width: 768px) and (max-width: 991.98px) { }

/* Large Devices (Desktops) */
@media (min-width: 992px) and (max-width: 1199.98px) { }

/* Extra Large Devices (Large Desktops) */
@media (min-width: 1200px) { }
```

---

## 🔧 Scripts Disponibles

### Desarrollo

```bash
# Servidor de desarrollo
npm start
# o
ng serve

# Servidor con host específico
ng serve --host 0.0.0.0 --port 4200

# Modo producción local
ng serve --configuration production
```

### Build

```bash
# Build de desarrollo
ng build

# Build de producción
ng build --configuration production

# Build con análisis de bundles
ng build --stats-json
npm run analyze
```

### Testing

```bash
# Tests unitarios
ng test

# Tests con coverage
ng test --code-coverage

# Tests E2E
ng e2e
```

### Linting y Formato

```bash
# Linting
ng lint

# Formato automático
npm run format
```

### Deployment

```bash
# Deploy a Firebase
npm run deploy:firebase

# Deploy a AWS
npm run deploy:aws
```

---

## 🐛 Solución de Problemas Comunes

### ⚠️ Warning: Budget exceeded

**Problema:**
```
WARNING: src/app/components/catalog/catalog-short/catalog-short.component.css 
exceeded maximum budget. Budget 12.29 kB was not met by 2.34 kB with a total of 14.63 kB.
```

**Solución:**
Ajustar los budgets en `angular.json`:

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
    }
  ]
}
```

### ⚠️ Warning: CommonJS dependencies

**Problema:**
```
Module 'aos' used by 'src/app/app.component.ts' is not ESM
```

**Solución:**
Agregar en `angular.json`:

```json
{
  "architect": {
    "build": {
      "options": {
        "allowedCommonJsDependencies": [
          "aos"
        ]
      }
    }
  }
}
```

---

## 👨‍💻 Autor

<div align="center">

### Santiago Arbelaez Contreras

**Junior Full Stack Developer**  
*Estudiante de Ingeniería de Sistemas*  
Universidad del Quindío

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/tu-usuario)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/tu-perfil)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:tu-email@ejemplo.com)

---

### 💼 Especializaciones

```
🎯 Frontend Development (Angular, React, Vue)
🔧 Backend Development (Node.js, Express)
📱 Mobile Development (Flutter, React Native)
🎨 UI/UX Design (Figma, Adobe XD)
```

</div>

---

## 📄 Licencia

```
MIT License

Copyright (c) 2024 Plaxtilíneas y Asociados

Se concede permiso, de forma gratuita, a cualquier persona que obtenga una copia
de este software y archivos de documentación asociados (el "Software"), para usar
el Software sin restricciones, incluyendo sin limitación los derechos de usar,
copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias
del Software, y permitir a las personas a quienes se les proporcione el Software
hacer lo mismo, sujeto a las siguientes condiciones:

El aviso de copyright anterior y este aviso de permiso se incluirán en todas las
copias o porciones sustanciales del Software.

EL SOFTWARE SE PROPORCIONA "TAL CUAL", SIN GARANTÍA DE NINGÚN TIPO, EXPRESA O
IMPLÍCITA, INCLUYENDO PERO NO LIMITADO A LAS GARANTÍAS DE COMERCIABILIDAD,
IDONEIDAD PARA UN PROPÓSITO PARTICULAR Y NO INFRACCIÓN.
```

---

## 🙏 Agradecimientos

- **Angular Team** por el excelente framework
- **Firebase Team** por las herramientas de desarrollo
- **Plaxtilíneas, Districol y Espumas y Plásticos** por confiar en este proyecto
- **Universidad del Quindío** por el apoyo académico

---

<div align="center">

### 🛍️ Catálogo Digital

**Moderno • Mobile-First • Empresarial**

---

© 2024 Plaxtilíneas y Asociados. Todos los derechos reservados.

**Hosting URL:** [https://catalogo-6113e.web.app](https://catalogo-6113e.web.app)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub

</div>
