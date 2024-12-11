import { Injectable } from '@angular/core';
import { Venta } from '../models/venta.model';
import { map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { VentaPresencialRequest } from '../models/venta-pres-req.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  apiUrl = environment.apiUrl + "/ventas";

  constructor(private http: HttpClient) { }

  obtenerVentas(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl);
  }

  contarVentas(): Observable<number> {
    return this.obtenerVentas().pipe(
      map(ventas => ventas.length)
    );
  }

  filtrarVentasPresenciales(searchTerm: string): Observable<Venta[]> {
    let ventas = this.obtenerVentas();

    if (searchTerm !== '') {
      ventas = this.obtenerVentas().pipe(
        map(ventas => {
          return ventas.filter(venta => {
            return (
              venta.idVenta.toString().padStart(8, '0').includes(searchTerm.toLowerCase()) ||
              venta.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
              venta.dniCliente.includes(searchTerm.toLowerCase())
            )
          })
        })
      )
    }

    return ventas;
  }

  obtenerVentasFinalizadas(): Observable<Venta[]> {
    return this.obtenerVentas().pipe(
      map((ventas) => {
        return ventas.filter((venta) => {
          return venta.estado === "FINALIZADA"
        });
      })
    );
  }

  obtenerVentasDiarias(): Observable<Venta[]> {
    return this.obtenerVentasFinalizadas().pipe(
      map((ventas) => {
        console.log(ventas);
        return ventas.filter((venta) => {
          let fecha = new Date(venta.fecha);
          let hoy = new Date();

          return (
            fecha.getFullYear() === hoy.getFullYear() &&
            fecha.getMonth() === hoy.getMonth() &&
            fecha.getDate() === hoy.getDate()
          );
        })
      })
    )
  }

  obtenerGananciaDiaria(): Observable<number> {
    return this.obtenerVentasDiarias().pipe(
      map((ventas) => {
        return ventas.reduce((total, venta) => total + venta.total, 0);
      })
    )
  }

  obtenerVentasAnuales(): Observable<Venta[]> {
    return this.obtenerVentasFinalizadas().pipe(
      map((ventas) => {
        return ventas.filter((venta) => {
          let fecha = new Date(venta.fecha);
          let hoy = new Date();

          return fecha.getFullYear() === hoy.getFullYear();
        })
      })
    )
  }

  obtenerGananciaAnual(): Observable<number> {
    return this.obtenerVentasAnuales().pipe(
      map((ventas) => {
        return ventas.reduce((total, venta) => total + venta.total, 0);
      })
    )
  }

  obtenerVentaPorId(id: number): Observable<Venta> {
    return this.http.get<Venta>(`${this.apiUrl}/${id}`);
  }

  registrarVenta(request: VentaPresencialRequest): Observable<Venta> {
    return this.http.post<Venta>(this.apiUrl, request);
  }
}
