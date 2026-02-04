# Servicio PDF - Documentación

## Descripción
El servicio `PdfService` permite generar archivos PDF a partir del contenido HTML de la aplicación Angular.

## Métodos disponibles

### 1. `generatePdfFromElement(elementId, fileName?, options?)`
Genera un PDF de un elemento específico de la página.

**Parámetros:**
- `elementId` (string): ID del elemento HTML a capturar
- `fileName` (string, opcional): Nombre del archivo PDF (por defecto: 'catalogo.pdf')
- `options` (object, opcional):
  - `quality` (number): Calidad de la imagen (0-1, por defecto: 0.95)
  - `format` ('a4' | 'a3' | 'letter'): Formato del papel (por defecto: 'a4')
  - `orientation` ('portrait' | 'landscape'): Orientación (por defecto: 'portrait')

**Ejemplo:**
```typescript
// Generar PDF de un elemento específico
await pdfService.generatePdfFromElement('mi-elemento', 'mi-archivo.pdf', {
  format: 'a4',
  orientation: 'landscape'
});
```

### 2. `generatePdfFromPage(fileName?, options?)`
Genera un PDF de toda la página actual (elemento con id 'main').

**Ejemplo:**
```typescript
// Generar PDF de toda la página
await pdfService.generatePdfFromPage('pagina-completa.pdf');
```

### 3. `generatePdfFromMultipleElements(elementIds, fileName?, options?)`
Genera un PDF con múltiples elementos, cada uno en una página separada.

**Parámetros:**
- `elementIds` (string[]): Array de IDs de elementos a incluir
- `fileName` (string, opcional): Nombre del archivo
- `options` (object, opcional): Opciones de formato

**Ejemplo:**
```typescript
// Generar PDF con múltiples secciones
await pdfService.generatePdfFromMultipleElements(
  ['seccion1', 'seccion2', 'seccion3'],
  'documento-multiple.pdf'
);
```

### 4. `generateCatalogPdf(fileName?)`
Genera un PDF del catálogo completo con todas las secciones.

**Ejemplo:**
```typescript
// Generar PDF del catálogo completo
await pdfService.generateCatalogPdf('catalogo-completo.pdf');
```

## Uso en componentes

### Importar el servicio
```typescript
import { PdfService } from '../services/pdf.service';

export class MiComponent {
  constructor(private pdfService: PdfService) {}

  async imprimir() {
    try {
      await this.pdfService.generateCatalogPdf();
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
```

### En el template HTML
```html
<button (click)="imprimir()">Imprimir Catálogo</button>
```

## IDs de elementos disponibles

Los siguientes IDs están disponibles en la aplicación para generar PDFs:

- `plaxtilineas-section`: Sección completa de Plaxtilineas
- `espumasplasticos-section`: Sección completa de Espumas Plásticos
- `districol-section`: Sección completa de Districol

## Consideraciones

1. **CORS**: Asegúrate de que las imágenes tengan permisos CORS si son de dominios externos
2. **Tamaño**: Los PDFs grandes pueden tardar en generarse
3. **Estilos**: Los estilos CSS se aplican automáticamente
4. **Fuentes**: Las fuentes web pueden no renderizarse correctamente en el PDF

## Dependencias

- `jspdf`: Para crear archivos PDF
- `html2canvas`: Para capturar contenido HTML como imagen
- `@types/jspdf`: Tipos TypeScript para jsPDF</content>
<parameter name="filePath">c:\Users\Santiago\OneDrive\Escritorio\Catalogo\PDF_SERVICE_README.md