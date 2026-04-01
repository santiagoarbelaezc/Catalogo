<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header&animation=fadeIn" />
</div>

<div align="center">

# 🛍️ Catálogo Digital — Panel de Gestión Empresarial

### Plataforma centralizada para administrar y publicar catálogos de productos en múltiples sitios web

[![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)


**Un solo panel. Tres sitios web. Gestión total de productos.**

[🚀 Demo en Vivo](https://catalogo-6113e.web.app) · [🐛 Reportar Bug](https://github.com/santiagoarbelaezc/catalogo-digital/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción del Proyecto](#-descripción-del-proyecto)
- [Sitios Web Gestionados](#-sitios-web-gestionados)
- [Diagrama del Sistema](#-diagrama-del-sistema)
- [Características Principales](#-características-principales)
- [Dashboard de Administración](#-dashboard-de-administración)
- [Exportación y Compartir](#-exportación-y-compartir)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Solución de Problemas Comunes](#-solución-de-problemas-comunes)
- [Autor](#-autor)

---

## 📝 Descripción del Proyecto

**Catálogo Digital** es una plataforma web centralizada desarrollada en **Angular + PHP**, diseñada para que un administrador gestione desde un único panel los catálogos de productos de **tres empresas distintas**: Plaxtilíneas, Espumas y Plásticos, y Districol.

Desde este panel se pueden **crear, editar y eliminar productos**, y los cambios se reflejan automáticamente en los sitios web públicos de cada empresa. Además, la plataforma permite **exportar el catálogo en PDF** y **compartir el sitio** directamente con clientes.

### 🎯 Objetivo Principal

Eliminar la necesidad de actualizar tres sitios web por separado. Con una sola operación desde el panel de administración, el producto queda publicado y visible en el sitio correspondiente de forma inmediata.

---

## 🏢 Desplegado en Hostinger

Con Plaxtilineas, Espumas y Plasticos, Districol
 

---

## 🏢 Sitios Web Gestionados

Desde este catálogo se administran los productos de las siguientes tres empresas:

<table>
<tr>
<td align="center" width="33%">

### 🔷 Plaxtilíneas
**Soluciones en Plásticos**

Productos innovadores para la industria plástica. El catálogo gestiona toda la línea de productos disponibles en su sitio web oficial.

</td>
<td align="center" width="33%">

### 🟦 Espumas y Plásticos
**Materiales Industriales**

Distribución especializada de espumas y materiales. Los productos se actualizan en tiempo real desde este panel.

</td>
<td align="center" width="33%">

### 🔶 Districol
**Distribución Especializada**

Insumos y materiales industriales. La gestión de su catálogo completo se realiza desde esta plataforma.

</td>
</tr>
</table>

---

## 🗺️ Diagrama del Sistema

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CATÁLOGO DIGITAL (Este proyecto)                 │
│                    Angular + PHP · Panel de Administración          │
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                  DASHBOARD DE ADMINISTRACIÓN                  │  │
│  │                                                              │  │
│  │   [+ Crear Producto]  [✏ Editar]  [🗑 Eliminar]             │  │
│  │   [Seleccionar Empresa: Plaxtilíneas | EspumasYPlásticos |   │  │
│  │                         Districol]                           │  │
│  │   [📄 Exportar PDF]   [🔗 Compartir Sitio]                  │  │
│  └──────────────────────┬───────────────────────────────────────┘  │
│                         │                                           │
│              Actualización en tiempo real                           │
└─────────────────────────┼───────────────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────┐
│  🔷 Plaxtilíneas│ │🟦 Espumas y  │ │  🔶 Districol    │
│                 │ │   Plásticos  │ │                  │
│  Sitio Web      │ │              │ │  Sitio Web       │
│  Público        │ │  Sitio Web   │ │  Público         │
│                 │ │  Público     │ │                  │
│  ┌───────────┐  │ │ ┌──────────┐ │ │ ┌────────────┐  │
│  │ Catálogo  │  │ │ │Catálogo  │ │ │ │ Catálogo   │  │
│  │ Actualiz. │  │ │ │Actualiz. │ │ │ │ Actualiz.  │  │
│  └───────────┘  │ │ └──────────┘ │ │ └────────────┘  │
└─────────────────┘ └──────────────┘ └──────────────────┘
          │               │               │
          └───────────────┼───────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   CLIENTES FINALES    │
              │                      │
              │  📄 Catálogo PDF      │
              │  🔗 Link del sitio    │
              │  📱 Vista móvil       │
              └───────────────────────┘
```

---

## ✨ Características Principales

### 🖥️ Panel de Administración Centralizado

Un solo panel de administración que gestiona los tres sitios web de manera independiente. El administrador selecciona la empresa, realiza la operación (crear, editar o eliminar), y el cambio se publica automáticamente.

### 🔄 Gestión Completa de Productos

Desde el dashboard se puede crear un producto nuevo con nombre, descripción, categoría, imágenes y precio; editar cualquier campo de un producto existente en tiempo real; y eliminar productos que ya no estén disponibles, todo sin necesidad de acceder a cada sitio web por separado.

### 🏷️ Multiempresa

El catálogo permite trabajar con las tres empresas desde la misma interfaz. Cada empresa tiene su propia sección, su paleta de colores, y sus categorías de productos. Los productos no se mezclan entre empresas.

### 🔗 Compartir el Sitio

Desde el panel se puede copiar y compartir el enlace directo al catálogo público de cada empresa, facilitando el envío a clientes por WhatsApp, correo electrónico o redes sociales.

### 📱 Diseño Mobile-First

La plataforma está diseñada con enfoque mobile-first usando **Tailwind CSS**, garantizando una experiencia óptima tanto en el panel de administración como en los catálogos públicos, independientemente del dispositivo.

---

## 🖥️ Dashboard de Administración

El dashboard es la pieza central del proyecto. Desde aquí el administrador tiene control total sobre los catálogos de las tres empresas.

### Secciones del Dashboard

**1. Selector de Empresa**
Permite cambiar entre Plaxtilíneas, Espumas y Plásticos y Districol. Cada empresa muestra sus propios productos y categorías.

**2. Listado de Productos**
Vista en tabla o en cuadrícula de todos los productos de la empresa seleccionada, con opciones de búsqueda y filtrado por categoría.

**3. Formulario de Creación / Edición**
Formulario completo para ingresar o modificar:
- Nombre del producto
- Descripción
- Categoría y subcategoría
- Precio (opcional)
- Imágenes (una o varias)
- Estado (activo / inactivo)

**4. Acciones Rápidas**
Botones de acción directa sobre cada producto: editar, eliminar, activar/desactivar visibilidad en el sitio público.

**5. Exportar y Compartir**
Desde el dashboard se genera el PDF del catálogo completo o de una selección, y se obtiene el enlace del sitio para compartir.

### Flujo de Gestión de Productos

```
Administrador accede al Dashboard
         │
         ▼
Selecciona empresa (Plaxtilíneas / EspumasYPlásticos / Districol)
         │
         ├── [Crear producto] ──► Rellena formulario ──► Guardar ──► Publicado en sitio web
         │
         ├── [Editar producto] ──► Modifica campos ──► Guardar ──► Actualizado en sitio web
         │
         ├── [Eliminar producto] ──► Confirmación ──► Eliminado del sitio web
         │
         ├── [Exportar PDF] ──► Selecciona productos ──► Genera PDF ──► Descarga
         │
         └── [Compartir sitio] ──► Copia enlace ──► Envía a clientes
```

---

## 📄 Compartir


### Compartir el Sitio

Desde el panel, con un solo clic, se obtiene el enlace directo al catálogo público de la empresa seleccionada. Este enlace se puede enviar directamente a clientes por WhatsApp, correo o cualquier canal de comunicación.

---

## 💻 Tecnologías Utilizadas

### Frontend

| Tecnología | Versión | Propósito |
|---|---|---|
| **Angular** | 17+ | Framework principal |
| **TypeScript** | 5.0+ | Lenguaje de programación |
| **Tailwind CSS** | 3.x | Estilos y diseño responsive |
| **RxJS** | 7+ | Programación reactiva |
| **AOS** | 3.x | Animaciones al hacer scroll |

### Backend

| Tecnología | Propósito |
|---|---|
| **PHP 8.x** | API para gestión de productos y comunicación con los sitios web |

### Generación de PDF

| Librería | Propósito |
|---|---|
| **jsPDF** | Generación de documentos PDF |
| **html2canvas** | Captura de contenido HTML para PDF |

### Despliegue

| Plataforma | Entorno | Propósito |
|---|---|---|
| **AWS S3 + CloudFront** | Producción | Hosting estable para clientes finales |
| **Firebase Hosting** | Beta / Testing | Despliegue rápido para pruebas |

---

## 📁 Estructura del Proyecto

```
📦 catalogo-digital/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── 📁 components/
│   │   │   ├── 📁 catalog/
│   │   │   │   ├── 📁 catalog-card/        # Tarjeta de producto
│   │   │   │   ├── 📁 catalog-filter/      # Filtros y búsqueda
│   │   │   │   ├── 📁 catalog-grid/        # Vista cuadrícula
│   │   │   │   ├── 📁 catalog-list/        # Vista lista
│   │   │   │   └── 📁 catalog-print/       # Generación de PDF
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📁 product-form/        # Formulario crear/editar
│   │   │   │   ├── 📁 product-table/       # Tabla de productos
│   │   │   │   ├── 📁 company-selector/    # Selector de empresa
│   │   │   │   └── 📁 share-panel/         # Panel de compartir
│   │   │   ├── 📁 layout/
│   │   │   │   ├── 📁 footer/
│   │   │   │   ├── 📁 header/
│   │   │   │   └── 📁 navbar/
│   │   │   └── 📁 shared/
│   │   │       └── 📁 loading-spinner/
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── 📁 admin/                   # 🖥️ Dashboard administración
│   │   │   │   ├── 📄 admin.component.ts
│   │   │   │   ├── 📄 admin.component.html
│   │   │   │   └── 📄 admin.component.css
│   │   │   ├── 📁 catalogo-home/           # Inicio del catálogo público
│   │   │   ├── 📁 catalogo-print/          # Vista impresión / PDF
│   │   │   ├── 📁 plaxtilineas/            # Catálogo público Plaxtilíneas
│   │   │   ├── 📁 espumasplasticos/        # Catálogo público Espumas y Plásticos
│   │   │   └── 📁 districol/               # Catálogo público Districol
│   │   │
│   │   ├── 📁 services/
│   │   │   ├── 📄 product.service.ts       # CRUD de productos
│   │   │   ├── 📄 company.service.ts       # Gestión multiempresa
│   │   │   ├── 📄 pdf-generator.service.ts # Generación de PDF
│   │   │   ├── 📄 share.service.ts         # Compartir enlace del sitio
│   │   │   └── 📄 filter.service.ts        # Filtros del catálogo
│   │   │
│   │   ├── 📁 models/
│   │   │   ├── 📄 product.model.ts
│   │   │   ├── 📄 company.model.ts
│   │   │   └── 📄 category.model.ts
│   │   │
│   │   ├── 📁 data/
│   │   │   ├── 📄 plaxtilineas-products.json
│   │   │   ├── 📄 espumas-products.json
│   │   │   └── 📄 districol-products.json
│   │   │
│   │   └── 📁 utils/
│   │       ├── 📄 pdf.utils.ts
│   │       └── 📄 format.utils.ts
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   ├── 📁 logos/
│   │   └── 📁 icons/
│   │
│   ├── 📄 index.html
│   ├── 📄 main.ts
│   ├── 📄 styles.css
│   └── 📄 print-styles.css
│
├── 📄 angular.json
├── 📄 tailwind.config.js          # ⚙️ Configuración de Tailwind CSS
├── 📄 package.json
├── 📄 tsconfig.json
└── 📄 firebase.json
```

---

## 🐛 Solución de Problemas Comunes

**Warning: Budget exceeded**

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

**Warning: CommonJS dependencies (AOS)**

Agregar en `angular.json`:
```json
{
  "allowedCommonJsDependencies": ["aos"]
}
```

---

## 👨‍💻 Autor

<div align="center">

### Santiago Arbelaez Contreras
**Junior Full Stack Developer**
Estudiante de Ingeniería de Sistemas — Universidad del Quindío

<a href="https://github.com/santiagoarbelaezc">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" />
</a>
<img width="10" />
<a href="https://www.linkedin.com/in/santiago-arbelaez-contreras-9830b5290/">
  <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<img width="10" />
<a href="https://portfolio-santiagoa.web.app/portfolio">
  <img src="https://img.shields.io/badge/Portfolio-6C63FF?style=for-the-badge&logo=sparkles&logoColor=white" />
</a>
<img width="10" />
<a href="mailto:arbelaezz.c11@gmail.com">
  <img src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white" />
</a>

</div>

---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=90&section=footer&animation=fadeIn" />
  <p>© 2026 Santiago Arbelaez Contreras · Todos los derechos reservados</p>
  <p><strong>Hosting URL:</strong> <a href="https://catalogo-6113e.web.app">https://catalogo-6113e.web.app</a></p>
</div>
