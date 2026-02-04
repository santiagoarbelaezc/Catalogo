import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  
  constructor() { }

  /**
   * Genera un PDF del catálogo completo con todo el diseño
   */
  async generateCatalogPdf(fileName: string = 'catalogo-completo.pdf'): Promise<void> {
    try {
      // 1. Preparar el contenedor especial para el PDF
      await this.prepareForPdfGeneration();
      
      // 2. Generar PDF con todas las secciones
      await this.generateFullCatalogWithDesign(fileName);
      
      // 3. Restaurar el DOM
      this.cleanupAfterPdfGeneration();
      
    } catch (error) {
      console.error('Error generating catalog PDF:', error);
      // Fallback: generar PDF básico
      await this.generateBasicCatalogPdf(fileName);
    }
  }

  /**
   * Prepara el DOM para la generación de PDF
   */
  private async prepareForPdfGeneration(): Promise<void> {
    // Asegurarse de que todas las imágenes estén cargadas
    await this.waitForImages();
    
    // Añadir clase especial para impresión
    document.body.classList.add('printing-pdf');
    
    // Deshabilitar animaciones
    const style = document.createElement('style');
    style.id = 'print-styles';
    style.textContent = `
      * {
        animation: none !important;
        transition: none !important;
      }
      .printing-pdf {
        overflow: visible !important;
        height: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Genera el PDF completo con diseño
   */
  private async generateFullCatalogWithDesign(fileName: string): Promise<void> {
    // Obtener todas las secciones del catálogo
    const sections = this.getCatalogSections();

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    let currentPage = 1;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);

    // Agregar portada
    await this.addCoverPage(pdf);
    pdf.addPage();
    currentPage++;

    // Procesar cada sección
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];

      // Agregar página para cada sección
      if (i > 0) {
        pdf.addPage();
        currentPage++;
      }

      // Agregar encabezado de página
      await this.addPageHeader(pdf, section.title, currentPage);

      // Capturar y agregar la sección
      const sectionHeight = await this.captureAndAddSection(pdf, section, margin, 30, contentWidth, contentHeight - 20);

      console.log(`✅ Sección ${section.title} agregada al PDF`);
    }

    // Agregar números de página
    this.addPageNumbers(pdf);

    // Guardar PDF
    pdf.save(fileName);
  }

  /**
   * Obtiene las secciones del catálogo
   */
  private getCatalogSections(): Array<{id: string, title: string}> {
    return [
      { id: 'plaxtilineas-section', title: 'PLA XTILINEAS' },
      { id: 'espumasplasticos-section', title: 'ESPUMAS PLÁSTICOS' },
      { id: 'districol-section', title: 'DISTRICOL' }
    ];
  }

  /**
   * Agrega encabezado al PDF
   */
  private async addCatalogHeader(pdf: jsPDF, x: number, y: number): Promise<void> {
    // Título principal
    pdf.setFontSize(24);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    pdf.text('Catálogo de Productos', x, y);

    // Subtítulo
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    pdf.text('Plaxitlineas - Espumas Plásticos - Districol', x, y + 8);

    // Información de contacto
    pdf.setFontSize(10);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Teléfono: 3006680125', x, y + 16);
    pdf.text('Dirección: Cra. 19 #19-35', x + 70, y + 16);
  }

  /**
   * Agrega portada al PDF
   */
  private async addCoverPage(pdf: jsPDF): Promise<void> {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Fondo blanco
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, 'F');

    // Título principal
    pdf.setFontSize(36);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(40, 40, 40);
    const title = 'Catálogo de Productos';
    const titleWidth = pdf.getTextWidth(title);
    pdf.text(title, (pageWidth - titleWidth) / 2, 80);

    // Subtítulo
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(80, 80, 80);
    const subtitle = 'Plaxitlineas - Espumas Plásticos - Districol';
    const subtitleWidth = pdf.getTextWidth(subtitle);
    pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 100);

    // Información de contacto
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    const phone = 'Teléfono: 3006680125';
    const address = 'Dirección: Cra. 19 #19-35';
    pdf.text(phone, (pageWidth - pdf.getTextWidth(phone)) / 2, 130);
    pdf.text(address, (pageWidth - pdf.getTextWidth(address)) / 2, 145);

    // Fecha
    const date = new Date().toLocaleDateString('es-ES');
    pdf.setFontSize(10);
    pdf.text(`Generado: ${date}`, (pageWidth - pdf.getTextWidth(`Generado: ${date}`)) / 2, 170);
  }

  /**
   * Agrega encabezado de página
   */
  private async addPageHeader(pdf: jsPDF, title: string, pageNumber: number): Promise<void> {
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10;

    // Título de sección
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(60, 60, 60);
    pdf.text(title, margin, 20);

    // Información de contacto en el encabezado
    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text('Teléfono: 3006680125 | Dirección: Cra. 19 #19-35', margin, 15);
  }

  /**
   * Captura y agrega una sección al PDF
   */
  private async captureAndAddSection(
    pdf: jsPDF,
    section: {id: string, title: string},
    x: number,
    y: number,
    width: number,
    maxHeight: number
  ): Promise<number> {
    const element = document.getElementById(section.id);

    if (!element) {
      console.warn(`Section ${section.id} not found, adding placeholder`);
      // Agregar placeholder si no se encuentra la sección
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Sección ${section.title} no encontrada`, x, y + 20);
      return 40;
    }

    try {
      // Preparar el elemento para captura
      element.style.backgroundColor = '#ffffff';

      // Capturar con html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth || element.offsetWidth,
        height: element.scrollHeight || element.offsetHeight,
        onclone: (clonedDoc, clonedElement) => {
          // Aplicar estilos de impresión al clon
          this.optimizeElementForPrint(clonedElement as HTMLElement);
        }
      });

      // Calcular dimensiones
      const imgAspectRatio = canvas.width / canvas.height;
      const imgWidth = width;
      const imgHeight = imgWidth / imgAspectRatio;

      // Si la imagen es demasiado alta, escalarla
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;

      if (imgHeight > maxHeight) {
        finalHeight = maxHeight;
        finalWidth = finalHeight * imgAspectRatio;
        // Centrar horizontalmente si es más estrecha
        if (finalWidth < width) {
          x = x + (width - finalWidth) / 2;
        }
      }

      // Agregar imagen al PDF
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(imgData, 'JPEG', x, y, finalWidth, finalHeight);

      console.log(`✅ Capturada sección ${section.title}: ${canvas.width}x${canvas.height}px -> ${finalWidth}x${finalHeight}mm`);

      return finalHeight + 10;

    } catch (error) {
      console.error(`❌ Error capturando sección ${section.id}:`, error);

      // Fallback: agregar texto básico
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Error al cargar ${section.title}`, x, y + 20);
      return 40;
    }
  }

  /**
   * Optimiza elemento para impresión
   */
  private optimizeElementForPrint(element: HTMLElement): void {
    // Aplicar estilos consistentes para impresión
    const styles = `
      <style>
        * {
          -webkit-print-color-adjust: exact !important;
          color-adjust: exact !important;
          background: white !important;
          color: black !important;
          border-color: #ddd !important;
          box-shadow: none !important;
          text-shadow: none !important;
        }

        .catalog-section {
          background: white !important;
          color: black !important;
          border: none !important;
          margin: 0 !important;
          padding: 20px !important;
        }

        .product-card {
          background: white !important;
          border: 1px solid #eee !important;
          border-radius: 8px !important;
          margin-bottom: 15px !important;
          padding: 15px !important;
          page-break-inside: avoid !important;
          break-inside: avoid !important;
        }

        .product-image img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 4px !important;
        }

        .product-title {
          color: black !important;
          font-size: 16px !important;
          font-weight: bold !important;
          margin: 10px 0 !important;
        }

        .product-description {
          color: #333 !important;
          font-size: 12px !important;
          line-height: 1.4 !important;
        }

        .product-price {
          color: #15CD82 !important;
          font-size: 14px !important;
          font-weight: bold !important;
        }

        /* Ocultar elementos no necesarios */
        .no-print,
        .navbar,
        button,
        .actions,
        .mobile-menu,
        .hamburger-btn {
          display: none !important;
        }

        /* Asegurar que las imágenes se vean bien */
        img {
          max-width: 100% !important;
          height: auto !important;
          image-rendering: -webkit-optimize-contrast !important;
        }
      </style>
    `;

    // Insertar estilos en el head del documento clonado
    const head = element.ownerDocument?.head || element.ownerDocument?.getElementsByTagName('head')[0];
    if (head) {
      head.insertAdjacentHTML('beforeend', styles);
    }

    // Forzar recarga de imágenes para asegurar que se capturen
    const images = element.querySelectorAll('img');
    images.forEach((img: HTMLImageElement) => {
      if (img.complete && img.naturalHeight > 0) {
        // Imagen ya cargada, está bien
      } else {
        // Forzar que la imagen se considere cargada
        img.style.visibility = 'visible';
      }
    });
  }

  /**
   * Agrega números de página
   */
  private addPageNumbers(pdf: jsPDF): void {
    const totalPages = pdf.internal.pages.length - 1; // -1 porque la primera página es la portada

    for (let i = 2; i <= pdf.internal.pages.length; i++) { // Empezar desde la página 2
      pdf.setPage(i);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);

      const pageNum = i - 1; // Página 1 es la portada, así que las numeradas empiezan en 1
      const pageText = `Página ${pageNum} de ${totalPages}`;

      pdf.text(pageText, 10, pageHeight - 10);
      pdf.text('Catálogo Plaxitlineas © 2024', pageWidth - 10, pageHeight - 10, { align: 'right' });
    }
  }

  /**
   * Limpia después de generar PDF
   */
  private cleanupAfterPdfGeneration(): void {
    document.body.classList.remove('printing-pdf');
    const printStyles = document.getElementById('print-styles');
    if (printStyles) {
      printStyles.remove();
    }
  }

  /**
   * Espera a que las imágenes se carguen
   */
  private async waitForImages(): Promise<void> {
    const images = Array.from(document.querySelectorAll('img'));
    const promises = images.map(img => {
      if (img.complete) return Promise.resolve();
      
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', () => resolve()); // Continuar incluso si falla
      });
    });
    
    await Promise.all(promises);
  }

  /**
   * Genera un PDF básico del catálogo con texto (fallback cuando html2canvas falla)
   * @param fileName Nombre del archivo PDF
   */
  private async generateBasicCatalogPdf(fileName: string = 'catalogo-basico.pdf'): Promise<void> {
    try {
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Configurar fuente
      pdf.setFont('helvetica', 'normal');

      // Título
      pdf.setFontSize(20);
      pdf.text('Catálogo de Productos', 20, 30);

      pdf.setFontSize(14);
      pdf.text('Plaxitlineas - Espumas Plásticos - Districol', 20, 45);

      // Información de contacto
      pdf.setFontSize(12);
      pdf.text('Información de Contacto:', 20, 65);
      pdf.text('Teléfono: 3006680125', 20, 75);
      pdf.text('Dirección: Cra. 19 #19-35', 20, 85);

      // Secciones del catálogo
      const sections = [
        {
          title: 'PLA XTILINEAS',
          products: [
            'Malla plástica multiusos',
            'POLIFLEX 2.0 - La nueva generación de la espuma',
            'Soga pisadora',
            'Pisos Vinílicos',
            'Mantel Plástico',
            'Papel Decorativo',
            'Espumas',
            'Pegantes - Cemento e Incoloro Continental',
            'Polisombras',
            'Plástico Burbuja',
            'Clavos de acero'
          ]
        },
        {
          title: 'ESPUMAS PLÁSTICOS',
          products: [
            'Espuma de poliuretano flexible',
            'Espuma viscoelástica',
            'Espuma de alta densidad',
            'Espuma acústica',
            'Espuma retardante al fuego',
            'Espuma para colchones',
            'Espuma para tapicería',
            'Espuma para aislamiento',
            'Espuma para empaque',
            'Espuma para construcción',
            'Espuma para automotriz',
            'Espuma para muebles',
            'Espuma para juguetes'
          ]
        },
        {
          title: 'DISTRICOL',
          products: [
            'Pinturas acrílicas',
            'Pinturas al óleo',
            'Pinturas latex',
            'Esmaltes',
            'Barnices'
          ]
        }
      ];

      let yPosition = 105;

      sections.forEach(section => {
        // Título de sección
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(section.title, 20, yPosition);
        yPosition += 10;

        // Productos
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');

        section.products.forEach(product => {
          if (yPosition > 270) { // Nueva página si es necesario
            pdf.addPage();
            yPosition = 30;
          }
          pdf.text(`• ${product}`, 25, yPosition);
          yPosition += 6;
        });

        yPosition += 10; // Espacio entre secciones
      });

      // Pie de página
      const pageCount = pdf.internal.pages.length;
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.text(`Página ${i} de ${pageCount}`, 20, 285);
        pdf.text('Generado automáticamente - Plaxitlineas', 150, 285);
      }

      pdf.save(fileName);
      console.log('Basic catalog PDF generated successfully');

    } catch (error) {
      console.error('Error generating basic catalog PDF:', error);
      throw new Error('No se pudo generar el PDF ni siquiera en modo básico');
    }
  }

  /**
   * Espera a que la página esté completamente cargada
   */
  private async waitForPageLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        // Esperar a que las imágenes se carguen
        this.waitForImages().then(() => {
          // Pequeño delay adicional para asegurar que todo esté renderizado
          setTimeout(resolve, 1000);
        });
      } else {
        window.addEventListener('load', () => {
          this.waitForImages().then(() => {
            setTimeout(resolve, 1000);
          });
        });
      }
    });
  }

  
}