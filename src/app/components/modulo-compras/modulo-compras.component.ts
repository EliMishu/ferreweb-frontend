import { Component, OnInit } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { ProductoService } from '../../services/producto.service';
import { AlmacenService } from '../../services/almacen.service';

@Component({
  selector: 'app-modulo-compras',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modulo-compras.component.html',
  styleUrl: './modulo-compras.component.css'
})
export class ModuloComprasComponent implements OnInit {
  proveedoresInfo: number = 0;
  comprasInfo: number = 0;
  stockBajoInfo: number = 0;
  almacenesInfo: number = 0;

  constructor (
    private router: Router,
    private proveedorService: ProveedorService,
    private ordenCompraService: OrdenCompraService,
    private productoService: ProductoService,
    private almacenService: AlmacenService
  ) {}

  ngOnInit(): void {
      this.cargarInfoDeProveedores();
      this.cargarInfoDeCompras();
      this.cargarInfoStockBajo();
      this.cargarInfoDeAlmacenes();
  }

  cargarInfoDeProveedores() {
    this.proveedorService.contarProveedores().subscribe((data) => {
      this.proveedoresInfo = data;
    });
  }

  cargarInfoDeCompras() {
    this.ordenCompraService.contarCompras().subscribe((data) => {
      this.comprasInfo = data;
    });
  }

  cargarInfoStockBajo() {
    this.productoService.contarProductosBajoStock().subscribe((data) => {
      this.stockBajoInfo = data;
    });
  }

  cargarInfoDeAlmacenes() {
    this.almacenService.contarAlmacenes().subscribe((data) => {
      this.almacenesInfo = data;
    })
  }

  redirigirConFiltros(ruta: string[], queryParams: Params): void {
    this.router.navigate(ruta, { queryParams });
  }
}
