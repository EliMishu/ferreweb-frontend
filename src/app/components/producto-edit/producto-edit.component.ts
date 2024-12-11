import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Categoria } from '../../models/categoria.model';
import { Almacen } from '../../models/almacen.model';
import { Unidad } from '../../models/unidad.model';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlmacenService } from '../../services/almacen.service';
import { CategoriaService } from '../../services/categoria.service';
import { UnidadService } from '../../services/unidad.service';
import { almacenUnicoValidator, imagenValidator, unidadUnicaValidator } from '../../validations/validations';
import { getImageTypes } from '../../constants/image.constants';
import { LimitDecimalDirective } from '../../directives/limit-decimal.directive';

@Component({
  selector: 'app-producto-edit',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatButtonModule,
    NgxMatFileInputModule,
    LimitDecimalDirective
  ],
  templateUrl: './producto-edit.component.html',
  styleUrl: './producto-edit.component.css'
})
export class ProductoEditComponent implements OnInit {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  almacenes: Almacen[] = [];
  unidades: Unidad[] = [];
  productoId!: number;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private almacenService: AlmacenService,
    private categoriaService: CategoriaService,
    private unidadService: UnidadService
  ) {
    const controlUnidad = this.crearControlUnidades();
    controlUnidad.patchValue({
      equivalencia: 1
    });

    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      unidadPorDefecto: ['', Validators.required],
      categoria: ['', Validators.required],
      unidadesPermitidas: this.fb.array([controlUnidad]),
      almacenes: this.fb.array([this.crearControlAlmacenes()]),
      imagen: [null, [imagenValidator()]]
    });
  }

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('idProducto'));
    this.cargarProducto();
    this.cargarCategorias();
    this.cargarAlmacenes();
    this.cargarUnidades();
  }

  cargarProducto(): void {
    this.productoService.obtenerProducto(this.productoId).subscribe((data) => {
      this.productoForm.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        unidadPorDefecto: data.unidadPorDefecto.nombre,
        categoria: data.categoria.nombre
      });
  
      const unidadEspecifica = data.unidadPorDefecto.nombre;
      const unidadPrincipal = data.unidadesPermitidas.find(unidad => unidad.unidad.nombre === unidadEspecifica);
      const otrasUnidades = data.unidadesPermitidas.filter(unidad => unidad.unidad.nombre !== unidadEspecifica);
  
      if (unidadPrincipal) {
        const unidadDefControl = this.unidadesPermitidas.at(0);
        unidadDefControl.patchValue({
          nombreUnidad: unidadPrincipal.unidad.nombre,
          precioPorUnidad: unidadPrincipal.precio,
          equivalencia: unidadPrincipal.equivalencia
        })
      }
  
      otrasUnidades.forEach((unidad) => {
        const unidadDefControl = this.crearControlUnidades();
        unidadDefControl.patchValue({
          nombreUnidad: unidad.unidad.nombre,
          precioPorUnidad: unidad.precio,
          equivalencia: unidad.equivalencia
        })
        this.unidadesPermitidas.push(unidadDefControl);
      });
  
      this.almacenesSeleccionados.clear();
      data.almacenes.forEach((almacen) => {
        const almacenControl = this.crearControlAlmacenes();
        almacenControl.patchValue({
          nombreAlmacen: almacen.almacen.nombre,
          cantidadProductos: almacen.cantidad
        })
        this.almacenesSeleccionados.push(almacenControl);
      });
    });
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    })
  }

  cargarAlmacenes(): void {
    this.almacenService.obtenerAlmacenes().subscribe((data) => {
      this.almacenes = data;
    })
  }
  
  cargarUnidades(): void {
    this.unidadService.obtenerUnidades().subscribe((data) => {
      this.unidades = data;
    })
  }

  crearControlUnidades(): FormGroup {
    return this.fb.group({
      nombreUnidad: ['', [Validators.required]],
      precioPorUnidad: [null, [Validators.required, Validators.min(0)]],
      equivalencia: [null, [Validators.required, Validators.min(0)]],
    });
  }

  crearControlAlmacenes(): FormGroup {
    return this.fb.group({
      nombreAlmacen: ['', [Validators.required, Validators.minLength(2)]],
      cantidadProductos: [null, [Validators.required, Validators.min(0)]],
    });
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.productoForm.patchValue({
      imagen: file
    });
  }

  onUnidadChange(event: any): void {
    const unidad = event.value;
    this.productoForm.patchValue({
      unidadPorDefecto: unidad
    });
  }

  editarProducto(): void {
    if (this.productoForm.valid) {
      this.isSubmitting = true;
      this.productoForm.disable();

      const request = this.productoForm.value;
      const imagen = this.productoForm.get('imagen')?.value;

      this.productoService.actualizarProducto(this.productoId, request, imagen).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.productoForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.productoForm.enable();
          this.alertService.showSuccess("Producto actualizado con éxito.")
        }
      });
    } 
  }

  cancelarEdicion(): void {
    this.router.navigate(['/productos']);
  }

  get unidadesPermitidas(): FormArray {
    return this.productoForm.get('unidadesPermitidas') as FormArray;
  }

  get almacenesSeleccionados(): FormArray {
    return this.productoForm.get('almacenes') as FormArray;
  }

  agregarUnidad(): void {
      const unidadControl = this.crearControlUnidades();
  
      unidadControl.get('nombreUnidad')?.setValidators([
        Validators.required,
        unidadUnicaValidator(this.unidadesPermitidas)
      ]);
      
      this.unidadesPermitidas.push(unidadControl);
  }

  eliminarUnidad(index: number): void {
    this.unidadesPermitidas.removeAt(index);
  }

  agregarAlmacen(): void {
    const almacenControl = this.crearControlAlmacenes();

    almacenControl.get('nombreAlmacen')?.setValidators([
      Validators.required,
      almacenUnicoValidator(this.almacenesSeleccionados)
    ])

    this.almacenesSeleccionados.push(almacenControl);
  }

  eliminarAlmacen(index: number): void {
    this.almacenesSeleccionados.removeAt(index);
  }

  getImageTypes(): string {
    return getImageTypes().join(', ');
  }
}
