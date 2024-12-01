import { Injectable } from '@angular/core';
import { EstadoVenta, Venta } from '../models/venta.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private estadosVenta: EstadoVenta[] = [
    { idEstadoVenta: 1, estado: 'Pendiente' },
    { idEstadoVenta: 2, estado: 'En Proceso' },
    { idEstadoVenta: 3, estado: 'Finalizado' },
    { idEstadoVenta: 4, estado: 'Cancelado' }
  ];

  constructor() { }

  obtenerVentas(): Observable<Venta[]> {
    const ventas: Venta[] = [
      { idVenta: 1, estado: this.estadosVenta[2], fecha: '2023-01-15', total: 150 },
      { idVenta: 2, estado: this.estadosVenta[2], fecha: '2024-01-22', total: 200 },
      { idVenta: 3, estado: this.estadosVenta[2], fecha: '2023-02-05', total: 350 },
      { idVenta: 4, estado: this.estadosVenta[2], fecha: '2024-02-18', total: 450 },
      { idVenta: 5, estado: this.estadosVenta[2], fecha: '2023-03-03', total: 300 },
      { idVenta: 6, estado: this.estadosVenta[2], fecha: '2024-03-12', total: 100 },
      { idVenta: 7, estado: this.estadosVenta[2], fecha: '2023-04-25', total: 600 },
      { idVenta: 8, estado: this.estadosVenta[2], fecha: '2023-05-25', total: 400 },
      { idVenta: 9, estado: this.estadosVenta[2], fecha: '2023-06-25', total: 500 },
      { idVenta: 10, estado: this.estadosVenta[2], fecha: '2023-07-25', total: 400 },
      { idVenta: 11, estado: this.estadosVenta[2], fecha: '2023-08-25', total: 300 },
      { idVenta: 12, estado: this.estadosVenta[2], fecha: '2023-09-25', total: 700 },
      { idVenta: 13, estado: this.estadosVenta[2], fecha: '2023-10-25', total: 600 },
      { idVenta: 14, estado: this.estadosVenta[2], fecha: '2023-11-25', total: 500 },
      { idVenta: 14, estado: this.estadosVenta[2], fecha: '2023-12-25', total: 600 },
    ];

    // Filtramos las ventas para eliminar las que están en estado "Cancelado"
    const ventasFinalizadas = ventas.filter(venta => venta.estado.estado === "Finalizado"); // Estado "Entregado"

    // Usamos `of` para devolver los datos como un Observable
    return of(ventasFinalizadas);
  }
}
