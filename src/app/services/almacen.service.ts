import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Almacen } from '../models/almacen.model';
import { AlmacenRequest } from '../models/almacen-request.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlmacenService {
  private apiUrl = environment.apiUrl + "/almacenes";

  constructor(private http: HttpClient) { }

  obtenerAlmacenes(): Observable<Almacen[]> {
    return this.http.get<Almacen[]>(this.apiUrl);
  }

  obtenerAlmacen(id: number): Observable<Almacen> {
    return this.http.get<Almacen>(`${this.apiUrl}/${id}`);
  }

  crearAlmacen(request: AlmacenRequest): Observable<Almacen> {
    return this.http.post<Almacen>(this.apiUrl, request);
  }

  actualizarAlmacen(id: number, request: AlmacenRequest): Observable<Almacen> {
    return this.http.put<Almacen>(`${this.apiUrl}/${id}`, request);
  }

  eliminarAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}