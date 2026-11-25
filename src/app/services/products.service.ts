import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el precio mínimo positivo (> 0) entre las variantes/referencias del producto.
   * Retorna 0 si el producto no tiene ningún precio configurado.
   */
  getProductMinPrice(product: any): number {
    if (!product) return 0;
    const variants = product.references || product.variants || [];
    const positivePrices = variants
      .map((v: any) => Number(v?.price))
      .filter((p: number) => !isNaN(p) && p > 0);

    if (positivePrices.length > 0) {
      return Math.min(...positivePrices);
    }

    const directPrice = Number(product.price);
    return !isNaN(directPrice) && directPrice > 0 ? directPrice : 0;
  }

  /**
   * Indica si el producto tiene al menos un precio válido (> 0) para mostrarse al público.
   */
  hasValidPrice(product: any): boolean {
    return this.getProductMinPrice(product) > 0;
  }

  /**
   * 📖 Obtener todos los productos
   * GET /api/productos
   */
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data ?? res),
      catchError(err => of([]))
    );
  }

  /**
   * 📖 Obtener un producto por ID
   * GET /api/productos/:id
   */
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(res => res.data ?? res),
      catchError(err => of(null))
    );
  }

  /**
   * 📖 Obtener un producto por Slug
   * GET /api/productos/slug/:slug
   */
  getProductBySlug(slug: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/slug/${slug}`).pipe(
      map(res => res.data ?? res),
      catchError(err => of(null))
    );
  }

  /**
   * 📖 Obtener productos por categoría
   * GET /api/productos/categoria/:category
   */
  getProductsByCategory(category: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/categoria/${category}`).pipe(
      map(res => res.data ?? res),
      catchError(err => of([]))
    );
  }

  /**
   * ✏️ Crear un nuevo producto con FormData
   * POST /api/productos
   */
  createProduct(productData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, productData).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * 🔄 Actualizar un producto con FormData
   * PUT /api/productos/:id
   */
  updateProduct(id: number, productData: FormData): Observable<any> {
    productData.append('_method', 'PUT');
    return this.http.post<any>(`${this.apiUrl}/${id}`, productData).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * 🗑️ Eliminar un producto (soft delete)
   * DELETE /api/productos/:id
   */
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * 🗑️ Eliminar permanentemente un producto
   * DELETE /api/productos/:id/permanent
   */
  permanentlyDeleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}/permanent`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Crear FormData a partir de un objeto de producto y archivos
   * Útil para enviar imágenes
   */
  createFormData(product: any, files?: File[]): FormData {
    const formData = new FormData();

    // Agregar datos del producto
    formData.append('name', product.name);
    if (product.slug !== undefined && product.slug !== null) formData.append('slug', product.slug);
    if (product.stock !== undefined && product.stock !== null) formData.append('stock', product.stock.toString());
    formData.append('description', product.description);
    formData.append('material', product.material);

    if (product.category !== undefined && product.category !== null) formData.append('category', product.category);
    if (product.category_id !== undefined && product.category_id !== null) formData.append('category_id', product.category_id.toString());
    if (product.subcategory_id !== undefined && product.subcategory_id !== null) formData.append('subcategory_id', product.subcategory_id.toString());
    if (product.options !== undefined && product.options !== null) formData.append('options', product.options);
    if (product.isNew !== undefined && product.isNew !== null) {
      const isNewVal = (product.isNew === 1 || product.isNew === '1' || product.isNew === true || product.isNew === 'true') ? '1' : '0';
      formData.append('isNew', isNewVal);
    }
    if (product.isFeatured !== undefined && product.isFeatured !== null) {
      const isFeaturedVal = (product.isFeatured === 1 || product.isFeatured === '1' || product.isFeatured === true || product.isFeatured === 'true') ? '1' : '0';
      formData.append('isFeatured', isFeaturedVal);
    }
    if (product.marca !== undefined && product.marca !== null) formData.append('marca', product.marca);
    if (product.gramaje !== undefined && product.gramaje !== null) formData.append('gramaje', product.gramaje);
    if (product.brandIconUrl !== undefined && product.brandIconUrl !== null) formData.append('brandIconUrl', product.brandIconUrl);

    // Agregar colores como string separado por comas
    // Siempre se envía para que el backend pueda borrar en caso de quedar vacío
    const colorString = Array.isArray(product.colors) && product.colors.length > 0
      ? product.colors.join(',')
      : '';
    formData.append('colors', colorString);

    // Agregar variantes como JSON string
    // Siempre se envía (array vacío si no hay variantes)
    formData.append('variants', JSON.stringify(product.variants ?? []));

    // Agregar imágenes de URL
    // Asegurar que is_primary o isPrimary viaje correctamente
    const formattedImages = (product.images ?? []).map((img: any) => ({
      url: typeof img === 'string' ? img : img.url,
      description: img.description || '',
      is_primary: img.isPrimary || img.is_primary ? 1 : 0
    }));
    formData.append('images', JSON.stringify(formattedImages));

    if (product.primaryFileIndex !== undefined && product.primaryFileIndex !== null) {
      formData.append('primaryFileIndex', product.primaryFileIndex.toString());
    }

    // Agregar archivos de imágenes con el campo 'imagenes[]'
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append('imagenes[]', file);
      });
    }

    return formData;
  }
}
