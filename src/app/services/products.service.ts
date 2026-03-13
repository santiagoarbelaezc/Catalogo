import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  /**
   * 📖 Obtener todos los productos
   * GET /api/productos
   */
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * 📖 Obtener un producto por ID
   * GET /api/productos/:id
   */
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * 📖 Obtener productos por categoría
   * GET /api/productos/categoria/:category
   */
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${category}`);
  }

  /**
   * ✏️ Crear un nuevo producto con FormData
   * POST /api/productos
   */
  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  /**
   * 🔄 Actualizar un producto con FormData
   * PUT /api/productos/:id
   */
  updateProduct(id: number, productData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData);
  }

  /**
   * 🗑️ Eliminar un producto (soft delete)
   * DELETE /api/productos/:id
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * 🗑️ Eliminar permanentemente un producto
   * DELETE /api/productos/:id/permanent
   */
  permanentlyDeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/permanent`);
  }

  /**
   * Crear FormData a partir de un objeto de producto y archivos
   * Útil para enviar imágenes
   */
  createFormData(product: any, files?: File[]): FormData {
    const formData = new FormData();

    // Agregar datos del producto
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('material', product.material);

    if (product.category) formData.append('category', product.category);
    if (product.options) formData.append('options', product.options);
    if (product.isNew !== undefined) formData.append('isNew', product.isNew.toString());
    if (product.isFeatured !== undefined) formData.append('isFeatured', product.isFeatured.toString());
    if (product.marca) formData.append('marca', product.marca);
    if (product.gramaje) formData.append('gramaje', product.gramaje);
    if (product.brandIconUrl) formData.append('brandIconUrl', product.brandIconUrl);

    // Agregar colores como string separado por comas
    if (product.colors && product.colors.length > 0) {
      const colorString = Array.isArray(product.colors)
        ? product.colors.join(',')
        : product.colors;
      formData.append('colors', colorString);
    }

    // Agregar variantes como JSON string
    if (product.variants && product.variants.length > 0) {
      formData.append('variants', JSON.stringify(product.variants));
    }

    // Agregar imágenes de URL (si existen)
    if (product.images && product.images.length > 0) {
      formData.append('images', JSON.stringify(product.images));
    }

    // Agregar archivos de imágenes con el campo 'imagenes'
    // Usar Array.from() para convertir FileList a Array
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append('imagenes', file);
      });
    }

    return formData;
  }
}
