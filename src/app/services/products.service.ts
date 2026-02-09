import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  private apiUrl = 'http://localhost:5000/api/productos';

  constructor(private http: HttpClient) {}

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
   * ✏️ Crear un nuevo producto
   * POST /api/productos
   * 
   * @param productData - Datos del producto (incluyendo archivos)
   */
  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData);
  }

  /**
   * ✏️ Crear un nuevo producto (sin imágenes)
   * POST /api/productos
   */
  createProductWithoutImages(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, product);
  }

  /**
   * 🔄 Actualizar un producto (sin imágenes)
   * PUT /api/productos/:id
   */
  updateProduct(id: number, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData);
  }

  /**
   * 🔄 Actualizar un producto con imágenes
   * PUT /api/productos/:id/con-imagenes
   */
  updateProductWithImages(id: number, productData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/con-imagenes`, productData);
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

    // Agregar colores
    if (product.colors && product.colors.length > 0) {
      if (Array.isArray(product.colors)) {
        formData.append('colors', JSON.stringify(product.colors));
      } else {
        formData.append('colors', product.colors);
      }
    }

    // Agregar variantes
    if (product.variants && product.variants.length > 0) {
      formData.append('variants', JSON.stringify(product.variants));
    }

    // Agregar archivos de imágenes
    if (files && files.length > 0) {
      files.forEach((file, index) => {
        formData.append('imagenes', file);
      });
    }

    return formData;
  }
}
