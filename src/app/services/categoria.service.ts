import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Categoria } from '../models/categoria.models';
import { CategoriaRequest } from '../models/categoria-req.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = environment.apiUrl + "/categorias";

  constructor(private http: HttpClient) { }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  obtenerCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  filtrarCategorias(searchTerm: string): Observable<Categoria[]> {
    let categorias = this.obtenerCategorias();

    if (searchTerm === '') {
      return categorias;
    } else {
      return categorias.pipe(
        map(categorias => {
          return categorias.filter((categoria) => {
            return (categoria.idCategoria.toString().includes(searchTerm.toLowerCase()) ||
              categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
              categoria.descripcion.toLowerCase().includes(searchTerm.toLowerCase()));
          })
        })
      )
    }
  }
 
  crearCategoria(request: CategoriaRequest, imagen: File): Observable<Categoria> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.post<Categoria>(this.apiUrl, formData);
  }

  actualizarCategoria(id: number, request: CategoriaRequest, imagen: File): Observable<Categoria> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
