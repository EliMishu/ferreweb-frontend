import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { LimitDecimalDirective } from '../../directives/limit-decimal.directive';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ProductoService } from '../../services/producto.service';
import { AlmacenService } from '../../services/almacen.service';
import { isNumberAsync } from '../../validations/validations';
import { MetodoPagoService } from '../../services/metodo-pago.service';
import { Almacen } from '../../models/almacen.model';
import { map, Observable, startWith } from 'rxjs';
import { MetodoPago } from '../../models/metodo-pago.model';
import { Producto, UnidadPermitida } from '../../models/producto.model';
import { DetalleVentaRequest, VentaPresencialRequest } from '../../models/venta-pres-req.model';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-venta-presencial-create',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatTableModule,
    MatIconModule,
    LimitDecimalDirective],
  templateUrl: './venta-presencial-create.component.html',
  styleUrl: './venta-presencial-create.component.css'
})
export class VentaPresencialCreateComponent implements OnInit {
  generalForm: FormGroup;
  detallesForm: FormGroup;
  pagoForm: FormGroup;
  productos: Producto[] = [];
  almacenes: Almacen[] = [];
  filteredAlmacenes!: Observable<Almacen[]>;
  metodos: MetodoPago[] = [];
  filteredMetodos!: Observable<MetodoPago[]>;
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private productoService: ProductoService,
    private almacenService: AlmacenService,
    private metodoPagoService: MetodoPagoService,
    private ventaService: VentaService

  ) {
    this.generalForm = this.fb.group({
      dniCliente: [null, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      idAlmacen: [null, Validators.required, isNumberAsync()]
    });
    this.detallesForm = fb.group({
      detalles: this.fb.array([this.crearProducto()])
    })
    this.pagoForm = fb.group({
      idMetodoPago: [null, Validators.required, isNumberAsync()]
    })
  }

  ngOnInit(): void {
      this.cargarAlmacenes();
      this.initFiltroAlmacenes();
      this.cargarProductos();
      this.cargarMetodos();
      this.initFiltroMetodos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    })
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenes().subscribe((data) => {
      this.almacenes = data;
    })
  }

  initFiltroAlmacenes(): void {
    this.filteredAlmacenes = this.generalForm.get('idAlmacen')!.valueChanges.pipe(
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
    this.filteredMetodos = this.pagoForm.get('idMetodoPago')!.valueChanges.pipe(
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

  get detallesFormArray(): FormArray {
    return this.detallesForm.get('detalles') as FormArray;
  }

  crearProducto(): FormGroup {
    return this.fb.group({
      idProducto: [null, Validators.required],
      idUnidad: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
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

        detalleCtrl.get('cantidad')?.setValidators([
          Validators.required,
          Validators.min(1),
          Validators.max(this.obtenerStockDisponible(rowIndex))
        ]);
        
        detalleCtrl.get('cantidad')?.updateValueAndValidity();
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

    detalleCtrl.get('cantidad')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.obtenerStockDisponible(rowIndex))
    ]);
    
    detalleCtrl.get('cantidad')?.updateValueAndValidity();
  }

  obtenerStockDisponible(index: number): number {
    const detalle = this.detallesFormArray.at(index);
    const idProducto = detalle.get('idProducto')?.value;
    const idUnidad = detalle.get('idUnidad')?.value;
    const idAlmacen = this.generalForm.get('idAlmacen')?.value;
  
    if (idProducto && idUnidad && idAlmacen) {
      const producto = this.productos.find(p => p.idProducto === idProducto);
      if (!producto) return 0;
  
      const almacenSeleccionado = producto.almacenes.find(a => a.almacen.idAlmacen === idAlmacen);
      const stockBase = almacenSeleccionado?.cantidad || 0;
  
      const unidadSeleccionada = producto.unidadesPermitidas.find(u => u.unidad.idUnidad === idUnidad);
      const equivalencia = unidadSeleccionada?.equivalencia || 1;
  
      const stockDisponible = stockBase / equivalencia;

      return stockDisponible;
    }

    return 0;
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

  calcularSubtotal(detalle: DetalleVentaRequest, index: number): number {
    return detalle.cantidad * (this.unidadSeleccionada(index)?.precio || 0);
  }

  calcularSubtotalProductos(): number {
    const detalles: DetalleVentaRequest[] = this.detallesFormArray.value; 
    let acc = 0;

    for (let index = 0; index < detalles.length; index++) {
      const detalle = detalles[index];
      acc += this.calcularSubtotal(detalle, index);
    }
    
    return acc;
  }
  
  calcularIGV(): number {
    const subtotal = this.calcularSubtotalProductos();
    return subtotal * 0.18;
  }
  
  calcularCostoTotal(): number {
    const subtotal = this.calcularSubtotalProductos();
    return subtotal + this.calcularIGV();
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

  prepararDataParaEnvio(): VentaPresencialRequest {
    const detalles = this.detallesFormArray.controls.map((control) => ({
      idProducto: control.value.idProducto,
      idUnidad: control.value.idUnidad,
      cantidad: control.value.cantidad
    }));


    return {
      dniCliente: this.generalForm.value.dniCliente,
      idAlmacen: this.generalForm.value.idAlmacen,
      idMetodoPago: this.pagoForm.value.idMetodoPago,
      detalles: detalles
    };
  }

  confirmarVenta() {
    const data = this.prepararDataParaEnvio();

    this.ventaService.registrarVenta(data).subscribe({
      next: () => this.router.navigate(['/ventas']),
      error: (err) => {
        this.alertService.showError(err.error.message);
        this.isSubmiting = false;
      },
      complete: () => {
        this.alertService.showSuccess('Venta procesada correctamente.')
        this.isSubmiting = false;
      }
    })
  }
}
