import { Component } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { VentaService } from '../../services/venta.service';
import { CommonModule } from '@angular/common';
import { Data } from '../../models/data.model';
import { Venta } from '../../models/venta.model';

@Component({
  selector: 'app-ventas-mes',
  standalone: true,
  imports: [CommonModule ,NgxChartsModule],
  templateUrl: './ventas-año.component.html',
  styleUrl: './ventas-año.component.css'
})
export class VentasAñoComponent {
  ventasData: Data[] = [];
  view: [number, number] = [600, 400];

  constructor(private ventaService: VentaService) {}

  ngOnInit() {
    this.ventaService.obtenerVentasAnuales().subscribe(ventas => {
      console.log(ventas);
      this.ventasData = this.convertirVentas(ventas);
    });
  }

  convertirVentas(ventas: Venta[]): Data[] {
    const ventasPorAño: { [año: string]: { [mes: string]: number } } = {};
  
    ventas.forEach(venta => {
      const fechaVenta = new Date(venta.fecha);
      const mes = fechaVenta.toLocaleString('default', { month: 'short' }).toLowerCase();
      const año = fechaVenta.getFullYear().toString();
  
      if (!ventasPorAño[año]) {
        ventasPorAño[año] = {};
      }
  
      if (!ventasPorAño[año][mes]) {
        ventasPorAño[año][mes] = 0;
      }
  
      ventasPorAño[año][mes] += venta.total;
    });
  
    const result: Data[] = [];
  
    const meses = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"];
  
    const años = Object.keys(ventasPorAño);
  
    años.forEach(año => {
      const series: { name: string, value: number }[] = [];
  
      meses.forEach(mes => {
        series.push({
          name: mes,
          value: ventasPorAño[año][mes] || 0
        });
      });
  
      result.push({
        name: año,
        series: series
      });
    });
  
    return result;
  }
}
