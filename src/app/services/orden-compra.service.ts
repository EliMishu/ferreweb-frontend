import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrdenCompraRequest } from '../models/orden-compra-req.model';
import { environment } from '../../environments/environment.prod';
import { OrdenCompra } from '../models/orden-compra.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DetalleTransferenciaRequest } from '../models/detalle-transferencia-req.model';

@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {
  private apiUrl = environment.apiUrl + "/ordenes-compra";

  constructor(private http: HttpClient) { }

  obtenerOrdenes(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(this.apiUrl);
  }

  filtrarOrdenes(searchTerm: string) {
    let ordenes = this.obtenerOrdenes();

    if (searchTerm !== '') {
      ordenes = ordenes.pipe(
        map((ordenes) => {
          return ordenes.filter((orden) => {
            return (orden.idOrdenCompra.toString().padStart(8, '0').includes(searchTerm.toLowerCase()) ||
                    orden.proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    orden.destino.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
          })
        })
      )
    }

    return ordenes
  }

  contarCompras(): Observable<number> {
    return this.obtenerOrdenes().pipe(
      map((ordenes) => {
        return ordenes.length;
      })
    );
  }
  
  crearOrdenCompra(request: OrdenCompraRequest): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(this.apiUrl, request);
  }

  aprobarOrdenCompra(id: number): Observable<OrdenCompra> {
    return this.http.patch<OrdenCompra>(`${this.apiUrl}/aprobar/${id}`, {});
  }

  pagarOrdenCompra(id: number, request: DetalleTransferenciaRequest, file: File): Observable<OrdenCompra> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http.patch<OrdenCompra>(`${this.apiUrl}/pagar/${id}`, formData)
  }

  procesarEntrega(id: number): Observable<OrdenCompra> {
    return this.http.patch<OrdenCompra>(`${this.apiUrl}/procesar/${id}`, {})
  }

  cancelarOrden(id: number, motivo: string): Observable<OrdenCompra> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: motivo
    };

    return this.http.patch<OrdenCompra>(`${this.apiUrl}/cancelar/${id}`, options);
  }

  descargarOrdenCompra(id: number): void {
    this.http
      .get(`${this.apiUrl}/descargar/${id}`, {
        responseType: 'blob',
      })
      .subscribe({
        next: (blob) => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = `orden-compra-${id}.xlsx`;
          a.click();
          URL.revokeObjectURL(objectUrl);
        },
        error: (error) => {
          console.error('Error al descargar la orden de compra:', error);
        },
      });
  }
}
