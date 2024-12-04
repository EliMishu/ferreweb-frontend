import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { Almacen } from '../models/almacen.model';
import { AlmacenRequest } from '../models/almacen-req.model';
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

  contarAlmacenes(): Observable<number> {
    return this.obtenerAlmacenes().pipe(
      map((almacenes) => {
        return almacenes.length;
      })
    );
  }

  filtrarAlmacenes(searchTerm: string): Observable<Almacen[]> {
    let almacenes = this.obtenerAlmacenes();

    if (searchTerm === '') return almacenes;

    return almacenes.pipe(
      map((almacenes) => {
        return almacenes.filter((almacen) => {
          return (almacen.idAlmacen.toString().includes(searchTerm.toLowerCase()) ||
                  almacen.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  almacen.direccion.toLowerCase().includes(searchTerm.toLowerCase()));
        });
      })
    );
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