import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Unidad } from '../models/unidad.model';
import { UnidadRequest } from '../models/unidad-req.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = environment.apiUrl + "/unidades"

  constructor(private http: HttpClient) { }

  obtenerUnidades(): Observable<Unidad[]> {
    return this.http.get<Unidad[]>(this.apiUrl);;
  }

  contarUnidades(): Observable<number> {
    return this.obtenerUnidades().pipe(
      map((unidades) => {
        return unidades.length;
      })
    );
  }

  obternerUnidad(id: number): Observable<Unidad> {
    return this.http.get<Unidad>(`${this.apiUrl}/${id}`);
  }

  filtrarUnidades(searchTerm: string): Observable<Unidad[]> {
    let unidades = this.obtenerUnidades();

    if (searchTerm === '') return unidades;

    return unidades.pipe(
      map((unidades) => {
        return unidades.filter((unidad) => {
          return (unidad.idUnidad.toString().includes(searchTerm.toLowerCase()) || 
                  unidad.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        });
      })
    );
  }

  crearUnidad(request: UnidadRequest): Observable<Unidad> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    
    return this.http.post<Unidad>(this.apiUrl, formData);
  }

  actualizarUnidad(id: number, request: UnidadRequest): Observable<Unidad> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    
    return this.http.put<Unidad>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarUnidad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
