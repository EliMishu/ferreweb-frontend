import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Almacen } from '../models/almacen.model';
import { AlmacenDTO } from '../models/almacen-dto.model';
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

  crearAlmacen(request: AlmacenDTO): Observable<Almacen> {
    return this.http.post<Almacen>(this.apiUrl, request);
  }

  actualizarAlmacen(id: number, request: AlmacenDTO): Observable<Almacen> {
    return this.http.put<Almacen>(`${this.apiUrl}/${id}`, request);
  }

  eliminarAlmacen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}