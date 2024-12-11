import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { ProveedorRequest } from '../models/proveedor-req.model';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = environment.apiUrl + "/proveedores";

  constructor(private http: HttpClient) { }

  obtenerProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  filtrarProveedores(searchTerm: string): Observable<Proveedor[]> {
    let proveedores = this.obtenerProveedores();

    if (searchTerm.trim() !== "") {
      let searchTerms = searchTerm.split(" ");

      searchTerms.forEach(term => {
        proveedores = proveedores.pipe(
          map(proveedores => {
            return proveedores.filter(proveedor => {
              return (
                proveedor.idProveedor.toString().includes(term.toLowerCase()) ||
                proveedor.ruc.includes(term.toLowerCase()) ||
                proveedor.nombre.toLowerCase().includes(term.toLowerCase()) ||
                proveedor.nombreComercial.toLowerCase().includes(term.toLowerCase()) ||
                proveedor.email.toLowerCase().includes(term.toLowerCase()) ||
                proveedor.telefono.toLowerCase().includes(term.toLowerCase()) ||
                proveedor.direccion.toLowerCase().includes(term.toLowerCase())
              )
            })
          })
        )
      })
    }

    return proveedores;
  }

  contarProveedores(): Observable<number> {
    return this.obtenerProveedores().pipe(
      map((proveedores) => {
        return proveedores.length;
      })
    );
  }

  obtenerProveedorPorId(id: number): Observable<Proveedor> {
    return this.http.get<Proveedor>(`${this.apiUrl}/${id}`)
  }

  crearProveedor(request: ProveedorRequest): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, request);
  }

  actualizarProveedor(id: number, request: ProveedorRequest) {
    return this.http.put<Proveedor>(`${this.apiUrl}/${id}`, request);
  }

  eliminarProveedor(id: number, motivo: string): Observable<void> {
    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: motivo
    };

    return this.http.delete<void>(`${this.apiUrl}/${id}`, options);
  }
}
