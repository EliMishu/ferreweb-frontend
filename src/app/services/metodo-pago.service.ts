import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { MetodoPago } from '../models/metodo-pago.model';
import { MetodoPagoRequest } from '../models/metodo-pago-req.model';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {
  private apiUrl = environment.apiUrl + "/metodos-pago";

  constructor(private http: HttpClient) { }

  obtenerMetodos(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>(this.apiUrl);
  }

  contarMetodos(): Observable<number> {
    return this.obtenerMetodos().pipe(
      map((metodo) => {
        return metodo.length;
      })
    );
  }

  filtrarMetodos(searchTerm: string): Observable<MetodoPago[]> {
    let metodos = this.obtenerMetodos();

    if (searchTerm === '') return metodos;

    return metodos.pipe(
      map((metodos) => {
        return metodos.filter((metodo) => {
          return (metodo.idMetodoPago.toString().includes(searchTerm.toLowerCase()) ||
                  metodo.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        });
      })
    );
  }

  obtenerMetodo(id: number): Observable<MetodoPago> {
    return this.http.get<MetodoPago>(`${this.apiUrl}/${id}`);
  }

  crearMetodo(request: MetodoPagoRequest): Observable<MetodoPago> {
    return this.http.post<MetodoPago>(this.apiUrl, request);
  }

  actualizarMetodo(id: number, request: MetodoPagoRequest): Observable<MetodoPago> {
    return this.http.put<MetodoPago>(`${this.apiUrl}/${id}`, request);
  }

  eliminarMetodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
