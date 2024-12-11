import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { Producto, UnidadPermitida } from '../../models/producto.model';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { DetalleCompraRequest, OrdenCompraRequest } from '../../models/orden-compra-req.model';
import { Almacen } from '../../models/almacen.model';
import { ProveedorService } from '../../services/proveedor.service';
import { AlmacenService } from '../../services/almacen.service';
import { Proveedor } from '../../models/proveedor.model';
import { fechaLimiteValidator, isNumber, isNumberAsync } from '../../validations/validations';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { MetodoPago } from '../../models/metodo-pago.model';
import { TipoEntrega } from '../../models/tipo-entrega.model';
import { TipoEntregaService } from '../../services/tipo-entrega.service';
import { LimitDecimalDirective } from '../../directives/limit-decimal.directive';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-orden-compra-create',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    LimitDecimalDirective
  ],
  templateUrl: './orden-compra-create.component.html',
  styleUrl: './orden-compra-create.component.css'
})
export class OrdenCompraCreateComponent implements OnInit {
  generalForm: FormGroup;
  detallesForm: FormGroup;
  costosForm: FormGroup;
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];
  filteredProveedores!: Observable<Proveedor[]>;
  almacenes: Almacen[] = [];
  filteredAlmacenes!: Observable<Almacen[]>;
  metodos: MetodoPago[] = [];
  filteredMetodos!: Observable<MetodoPago[]>;
  tiposEntrega: TipoEntrega[] = [];
  filteredTiposEntrega!: Observable<TipoEntrega[]>;
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private almacenService: AlmacenService,
    private metodoPagoService: MetodoPagoService,
    private tipoEntregaService: TipoEntregaService,
    private ordenCompraService: OrdenCompraService
  ) {
    this.generalForm = this.fb.group({
      idProveedor: [null, Validators.required, isNumberAsync()],
      idAlmacenDestino: [null, Validators.required, isNumberAsync()],
      fechaEsperada: [null, [Validators.required, fechaLimiteValidator(5)]]
    });
    this.detallesForm = fb.group({
      detalles: this.fb.array([this.crearProducto()])
    })
    this.costosForm = fb.group({
      idMetodoPago: [null, Validators.required, isNumberAsync()],
      idTipoEntrega: [1, Validators.required, isNumberAsync()],
      precioEnvio: [0, [Validators.required, Validators.min(0)]],
      otrosPagos: [0, [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.initFiltroProveedores();
    this.cargarAlmacenes();
    this.initFiltroAlmacenes();
    this.cargarProductos();
    this.cargarMetodos();
    this.initFiltroMetodos();
    this.cargarTiposEntrega();
    this.initFiltroTiposEntrega();
  }

  cargarProductos() {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    })
  }

  cargarProveedores(): void {
    this.proveedorService.obtenerProveedores().subscribe((data) => {
      this.proveedores = data;
    })
  }

  initFiltroProveedores(): void {
    this.filteredProveedores = this.generalForm.get('idProveedor')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.nombre || '')),
      map((nombre) => (nombre ? this._filterProveedores(nombre) : this.proveedores.slice()))
    );
  }

  displayProveedorFn(proveedores: Proveedor[]): (id: number) => string {
    return (id: number) => { 
      const proveedorSeleccionado = 
        Array.isArray(proveedores) ? proveedores.find(proveedor => proveedor.idProveedor === id) : null;
      return proveedorSeleccionado ? proveedorSeleccionado.nombre : '';
    }
  }

  private _filterProveedores(nombre: string): Proveedor[] {
    const filterValue = nombre.toLowerCase();
    return this.proveedores.filter((p) => p.nombre.toLowerCase().includes(filterValue));
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenes().subscribe((data) => {
      this.almacenes = data;
    })
  }

  initFiltroAlmacenes(): void {
    this.filteredAlmacenes = this.generalForm.get('idAlmacenDestino')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.nombre || '')),
      map((nombre) => (nombre ? this._filterAlmacenes(nombre) : this.almacenes.slice()))
    );
  }

  displayAlmacenFn(almacenes: Almacen[]): (id: number) => string {
    return (id: number) => { 
      const almacenSeleccionado = 
        Array.isArray(almacenes) ? almacenes.find(proveedor => proveedor.idAlmacen === id) : null;
      return almacenSeleccionado ? almacenSeleccionado.nombre : '';
    }
  }

  private _filterAlmacenes(nombre: string): Almacen[] {
    const filterValue = nombre.toLowerCase();
    return this.almacenes.filter((a) => a.nombre.toLowerCase().includes(filterValue));
  }

  cargarMetodos() {
    this.metodoPagoService.obtenerMetodos().subscribe((data) => {
      this.metodos = data;
    });
  }

  initFiltroMetodos(): void {
    this.filteredMetodos = this.costosForm.get('idMetodoPago')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.nombre || '')),
      map((nombre) => (nombre ? this._filterMetodos(nombre) : this.metodos.slice()))
    );
  }
  
  displayMetodoFn(metodos: MetodoPago[]): (id: number) => string {
    return (id: number) => {
      const metodoSeleccionado =
        Array.isArray(metodos) ? metodos.find((metodo => metodo.idMetodoPago === id)) : null;
      return metodoSeleccionado ? metodoSeleccionado.nombre : '';
    }
  }

  private _filterMetodos(nombre: string): MetodoPago[] {
    const filterValue = nombre.toLowerCase();
    return this.metodos.filter((m) => m.nombre.toLowerCase().includes(filterValue));
  }

  cargarTiposEntrega(): void {
    this.tipoEntregaService.obtenerTipos().subscribe((data) => {
      this.tiposEntrega = data;
    })
  }

  initFiltroTiposEntrega(): void {
    this.filteredTiposEntrega = this.costosForm.get('idTipoEntrega')!.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value?.tipo || '')),
      map((nombre) => (nombre ? this._filterTiposEntrega(nombre) : this.tiposEntrega.slice()))
    )
  }

  displayTipoEntregaFn(tipos: TipoEntrega[]): (id: number) => string {
    return (id: number) => {
      const tipoSeleccionado =
        Array.isArray(tipos) ? tipos.find((tipo) => tipo.idTipoEntrega === id) : null;
      return tipoSeleccionado ? tipoSeleccionado.tipo : '';
    }
  }

  private _filterTiposEntrega(nombre : string): TipoEntrega[] {
    const filterValue = nombre.toLowerCase();
    return this.tiposEntrega.filter((t) => t.tipo.toLowerCase().includes(filterValue));
  }

  get detallesFormArray(): FormArray {
    return this.detallesForm.get('detalles') as FormArray;
  }

  crearProducto(): FormGroup {
    return this.fb.group({
      idProducto: [null, Validators.required],
      idUnidad: [null, Validators.required],
      cantidad: [10, [Validators.required, Validators.min(10)]],
      precio: [0, [Validators.required, Validators.min(0)]]
    });
  }

  agregarProducto(): void {
    const productoFormGroup = this.crearProducto();
    this.detallesFormArray.push(productoFormGroup);
  }

  onProductoSeleccionado(event: any, rowIndex: number): void {
    const idProducto = event.value;
    if (idProducto) {
      const productoSeleccionado = this.productos.find(producto => producto.idProducto === idProducto);
      if (productoSeleccionado) {
        const detalleCtrl = this.detallesFormArray.controls.at(rowIndex) as FormGroup;
        const unidadPorDefecto = productoSeleccionado.unidadPorDefecto;
  
        detalleCtrl.patchValue({
          idProducto: productoSeleccionado.idProducto,
          idUnidad: unidadPorDefecto?.idUnidad,
        });
      }
    }
  }
  
  onUnidadSeleccionada(event: any, rowIndex: number): void {
    const idUnidad = event.value;
    const detalleCtrl = this.detallesFormArray.controls.at(rowIndex) as FormGroup;
  
    const unidadSeleccionada = this.unidadesPermitidas(rowIndex)?.find(u => u.unidad.idUnidad === idUnidad);
  
    if (unidadSeleccionada) {
      detalleCtrl.patchValue({
        idUnidad: unidadSeleccionada.unidad.idUnidad,
      });
    }
  }
  
  unidadesPermitidas(index: number): UnidadPermitida[] | undefined {
    return this.productoSeleccionado(index)?.unidadesPermitidas;
  }

  productoSeleccionado(index: number): Producto | undefined {
    const detalleCtrl = this.detallesFormArray.controls.at(index) as FormGroup;
    const idProducto = detalleCtrl.get('idProducto')?.value as number;
    return this.productos.find(producto => producto.idProducto === idProducto);
  }

  unidadSeleccionada(index: number): UnidadPermitida | undefined {
    const detalleCtrl = this.detallesFormArray.controls.at(index) as FormGroup;
    const idUnidad = detalleCtrl.get('idUnidad')?.value as number;
    return this.unidadesPermitidas(index)?.find(u => u.unidad.idUnidad === idUnidad);
  }

  prepararDataParaEnvio(): OrdenCompraRequest {
    const detalles = this.detallesFormArray.controls.map((control) => ({
      idProducto: control.value.idProducto,
      idUnidad: control.value.idUnidad,
      cantidad: control.value.cantidad,
      precio: control.value.precio
    }));


    return {
      idProveedor: this.generalForm.value.idProveedor,
      idAlmacenDestino: this.generalForm.value.idAlmacenDestino,
      fechaEsperada: this.generalForm.value.fechaEsperada,
      detalles: detalles,
      idMetodoPago: this.costosForm.value.idMetodoPago,
      idTipoEntrega: this.costosForm.value.idTipoEntrega,
      precioEnvio: this.costosForm.value.precioEnvio,
      otrosPagos: this.costosForm.value.otrosPagos,
    };
  }

  crearOrdenCompra(): void {
    const data = this.prepararDataParaEnvio();

    this.ordenCompraService.crearOrdenCompra(data).subscribe({
      next: () => this.router.navigate(['/compras']),
      error: (err) => {
        this.alertService.showError(err.error.message);
        this.isSubmiting = false;
      },
      complete: () => {
        this.alertService.showSuccess('Orden de compra generada correctamente.')
        this.isSubmiting = false;
      }
    })
  }

  esProductoRepetido(idProducto: number, rowIndex: number): boolean {
    return this.detallesFormArray.controls.some((detalle, index) => {
      return index !== rowIndex && detalle.get('idProducto')?.value === idProducto;
    });
  }

  eliminarProducto(index: number): void {
    if (this.detallesFormArray.length > 1) {
      this.detallesFormArray.removeAt(index);
    }
  }

  calcularSubtotal(detalle: DetalleCompraRequest): number {
    return detalle.cantidad * detalle.precio;
  }

  calcularSubtotalProductos(): number {
    const detalles: DetalleCompraRequest[] = this.detallesFormArray.value; 
  return detalles.reduce((acc: number, detalle: DetalleCompraRequest) => {
    return acc + this.calcularSubtotal(detalle);
  }, 0);
  }
  
  calcularIGV(): number {
    const subtotal = this.calcularSubtotalProductos();
    return subtotal * 0.18;
  }
  
  calcularCostoTotal(): number {
    const subtotal = this.calcularSubtotalProductos();
    return subtotal + this.calcularIGV();
  }
  
  calcularTotal(): number {
    const costoTotal = this.calcularCostoTotal();
    const envio = parseFloat(this.costosForm.value.precioEnvio) || 0;
    const otrosPagos = parseFloat(this.costosForm.value.otrosPagos) || 0;
    return costoTotal + envio + otrosPagos;
  }
}
