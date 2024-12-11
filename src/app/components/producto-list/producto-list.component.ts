import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto, UnidadPermitida } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { Unidad } from '../../models/unidad.model';
import { CategoriaService } from '../../services/categoria.service';
import { UnidadService } from '../../services/unidad.service';
import { Categoria } from '../../models/categoria.model';
import { AlertService } from '../../services/alert.service';
import { RolService } from '../../services/rol.service';
 
@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  categorias: Categoria[] = [];
  unidades: Unidad[] = [];
  searchTerm: string = '';
  categoria: string = '';
  unidad: string = '';
  estado: string = '';
  productoSeleccionado: Producto | null = null;

  constructor(
    private rolService: RolService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    private unidadService: UnidadService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoria = params['categoria'] || '';
      this.unidad = params['unidad'] || '';
      this.estado = params['estado'] || '';

      this.obtenerProductos();
    });


    this.obtenerProductos();
    this.obtenerCategorias();
    this.obtenerUnidades();
  }

  obtenerProductos(): void {
    this.productoService.filtrarProductos(this.searchTerm, this.categoria, this.unidad, this.estado).subscribe((data) => {
      this.productos = data;
    });
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  obtenerUnidades(): void {
    this.unidadService.obtenerUnidades().subscribe((data) => {
      this.unidades = data;
    });
  }

  eliminarProductoPorID(id: number): void {
    this.productoService.eliminarProducto(id).subscribe({
      next: () => {
        this.obtenerProductos();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Unidad eliminada con éxito.');
      }
    });
  }

  obtenerPrecio(unidadesPermitidas: UnidadPermitida[], unidad: Unidad): number {
    const unidadEncontrada: UnidadPermitida | undefined = unidadesPermitidas.find((unidadPermitida) => {
      return unidadPermitida.unidad.idUnidad === unidad.idUnidad;
    })

    if (unidadEncontrada) {
      return unidadEncontrada.precio;
    }

    return 0;
  }

  selectProducto(producto: Producto): void {
    this.productoSeleccionado = producto;
  }

  confirmarEliminacion(): void {
    if (this.productoSeleccionado) {
      this.eliminarProductoPorID(this.productoSeleccionado.idProducto);
      this.productoSeleccionado = null;
    }
  }

  get rol() {
    return this.rolService.obtenerRolSeleccionado();
  }
}
