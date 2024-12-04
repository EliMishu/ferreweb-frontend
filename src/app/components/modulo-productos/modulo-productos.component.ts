import { Component } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { CategoriaService } from '../../services/categoria.service';
import { UnidadService } from '../../services/unidad.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-modulo-productos',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modulo-productos.component.html',
  styleUrl: './modulo-productos.component.css'
})
export class ModuloProductosComponent {
  almacenesInfo = 0;
  categoriasInfo = 0;
  productosInfo = 0;
  stockBajoInfo = 0;
  unidadesInfo = 0;

  constructor (
    private router: Router,
    private almacenesService: AlmacenService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService,
    private unidadService: UnidadService
  ) {}

  ngOnInit(): void {
      this.cargarInfoDeAlmacenes();
      this.cargarInfoDeCategorias();
      this.cargarInfoDeProductos();
      this.cargarInfoDeStockBajo();
      this.cargarInfoDeUnidades();
  }

  cargarInfoDeAlmacenes() {
    this.almacenesService.contarAlmacenes().subscribe((data) => {
      this.almacenesInfo = data;
    });
  }

  cargarInfoDeCategorias() {
    this.categoriaService.contarCategorias().subscribe((data) => {
      this.categoriasInfo = data;
    });
  }

  cargarInfoDeProductos() {
    this.productoService.contarProductos().subscribe((data) => {
      this.productosInfo = data;
    });
  }

  cargarInfoDeStockBajo() {
    this.productoService.contarProductosBajoStock().subscribe((data) => {
      this.stockBajoInfo = data;
    });
  }

  cargarInfoDeUnidades() {
    this.unidadService.contarUnidades().subscribe((data) => {
      this.unidadesInfo = data;
    });
  }

  redirigirConFiltros(ruta: string[], queryParams: Params): void {
    this.router.navigate(ruta, { queryParams });
  }
}
