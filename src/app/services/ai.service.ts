import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AiDescriptionResponse {
  success: boolean;
  description?: string;
  message?: string;
}

export interface AiCategoryResponse {
  success: boolean;
  subcategory_id?: number | null;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  generateDescription(name: string): Observable<AiDescriptionResponse> {
    return this.http.post<AiDescriptionResponse>(`${this.apiUrl}/ia/generar-descripcion`, { name });
  }

  suggestCategory(name: string, description: string, categories: any[]): Observable<AiCategoryResponse> {
    return this.http.post<AiCategoryResponse>(`${this.apiUrl}/ia/sugerir-subcategoria`, { 
      name, 
      description,
      categories
    });
  }
}
