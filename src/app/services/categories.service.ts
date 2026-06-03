import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Category {
  id?: number;
  name: string;
}

export interface Subcategory {
  id?: number;
  category_id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // --- Categories ---

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias`);
  }

  createCategory(data: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categorias`, data);
  }

  updateCategory(id: number, data: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/categorias/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categorias/${id}`);
  }

  // --- Subcategories ---

  getSubcategoriesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/categorias/${categoryId}/subcategorias`);
  }

  createSubcategory(data: { category_id: number, name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/subcategorias`, data);
  }

  updateSubcategory(id: number, data: { name: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/subcategorias/${id}`, data);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subcategorias/${id}`);
  }
}
