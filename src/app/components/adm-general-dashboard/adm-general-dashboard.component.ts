import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { VentasAñoComponent } from '../../graphics/ventas-año/ventas-año.component';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-adm-general-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxChartsModule, VentasAñoComponent],
  templateUrl: './adm-general-dashboard.component.html',
  styleUrl: './adm-general-dashboard.component.css'
})
export class AdmGeneralDashboardComponent implements OnInit {
  empleadosInfo = 0;
  productosInfo = 0;
  ventasDiariasInfo = 0;
  ventasAnualesInfo = 0;

  constructor (
    private router: Router,
    private ventaService: VentaService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
      this.cargarInfoDeEmpleados();
      this.cargarInfoDeProductos();
      this.cargarInfoDeVentasDiarias();
      this.cargarInfoDeVentasAnuales();
  }

  cargarInfoDeEmpleados(): void {
    this.usuarioService.contarEmpleados().subscribe(
      (conteo) => {
        this.empleadosInfo = conteo;
      }
    );
  }

  cargarInfoDeProductos(): void {
    this.productoService.contarProductos().subscribe(
      (conteo) => {
        this.productosInfo = conteo;
      }
    )
  }
  
  cargarInfoDeVentasDiarias(): void {
    this.ventaService.obtenerGananciaDiaria().subscribe((data) => {
      this.ventasDiariasInfo = data;
    });
  }

  cargarInfoDeVentasAnuales(): void {
    this.ventaService.obtenerGananciaAnual().subscribe((data) => {
      this.ventasAnualesInfo = data;
    });
  }

  redirigirConFiltros(ruta: string[], queryParams: Params): void {
    this.router.navigate(ruta, { queryParams });
  }
}
