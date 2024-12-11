import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-modulo-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './modulo-ventas.component.html',
  styleUrl: './modulo-ventas.component.css'
})
export class ModuloVentasComponent implements OnInit {
  proveedoresInfo: number = 0;
  ventasInfo: number = 0;
  productosInfo: number = 0;

  constructor (
    private router: Router,
    private ventaService: VentaService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
      this.cargarInfoProductos();
      this.cargarInfoVentas();
  }

  cargarInfoVentas() {
    this.ventaService.contarVentas().subscribe((data) => {
      this.ventasInfo = data;
    });
  }

  cargarInfoProductos() {
    this.productoService.contarProductos().subscribe((data) => {
      this.productosInfo = data;
    });
  }

  redirigirConFiltros(ruta: string[], queryParams: Params): void {
    this.router.navigate(ruta, { queryParams });
  }
}