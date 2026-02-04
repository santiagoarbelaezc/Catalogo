import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-preview.component.html',
  styleUrl: './pdf-preview.component.css'
})
export class PdfPreviewComponent {
  showPreview = false;
  loading = false;

  constructor(private pdfService: PdfService) {}

  openPreview() {
    this.showPreview = true;
    this.loading = true;

    // Simular carga de vista previa
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  closePreview() {
    this.showPreview = false;
  }

  async generatePdf() {
    this.loading = true;
    try {
      await this.pdfService.generateCatalogPdf();
      this.closePreview();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      this.loading = false;
    }
  }
}