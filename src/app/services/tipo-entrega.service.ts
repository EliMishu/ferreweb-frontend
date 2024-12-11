import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TipoEntrega } from '../models/tipo-entrega.model';
import { TipoEntregaRequest } from '../models/tipo-entrega-req.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TipoEntregaService {
  private apiUrl = environment.apiUrl + "/tipos-entrega";

  constructor(private http: HttpClient) { }

  obtenerTipos(): Observable<TipoEntrega[]> {
    return this.http.get<TipoEntrega[]>(this.apiUrl);
  }

  contarTipos(): Observable<number> {
    return this.obtenerTipos().pipe(
      map((tipos) => {
        return tipos.length;
      })
    );
  }

  filtrarTipos(searchTerm: string): Observable<TipoEntrega[]> {
    let tipos = this.obtenerTipos();

    if (searchTerm === '') return tipos;

    return tipos.pipe(
      map((tipos) => {
        return tipos.filter((tipo) => {
          return (tipo.idTipoEntrega.toString().includes(searchTerm.toLowerCase()) ||
                  tipo.tipo.toLowerCase().includes(searchTerm.toLowerCase()));
        });
      })
    );
  }

  obtenerTipo(id: number): Observable<TipoEntrega> {
    return this.http.get<TipoEntrega>(`${this.apiUrl}/${id}`);
  }

  crearTipo(request: TipoEntregaRequest): Observable<TipoEntrega> {
    return this.http.post<TipoEntrega>(this.apiUrl, request);
  }

  actualizarTipo(id: number, request: TipoEntregaRequest): Observable<TipoEntrega> {
    return this.http.put<TipoEntrega>(`${this.apiUrl}/${id}`, request);
  }

  eliminarTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
