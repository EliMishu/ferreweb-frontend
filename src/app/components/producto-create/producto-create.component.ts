import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Categoria } from '../../models/categoria.model';
import { Almacen } from '../../models/almacen.model';
import { AlmacenService } from '../../services/almacen.service';
import { CategoriaService } from '../../services/categoria.service';
import { Unidad } from '../../models/unidad.model';
import { UnidadService } from '../../services/unidad.service';
import { almacenUnicoValidator, imagenValidator, unidadUnicaValidator } from '../../validations/validations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { getImageTypes } from '../../constants/image.constants';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AlertService } from '../../services/alert.service';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { LimitDecimalDirective } from '../../directives/limit-decimal.directive';

@Component({
  selector: 'app-producto-create',
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
  templateUrl: './producto-create.component.html',
  styleUrl: './producto-create.component.css'
})
export class ProductoCreateComponent implements OnInit  {
  productoForm: FormGroup;
  categorias: Categoria[] = [];
  almacenes: Almacen[] = [];
  unidades: Unidad[] = [];
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
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
      imagen: [null, [Validators.required, imagenValidator()]]
    });
  }

  ngOnInit(): void {
    this.cargarCategorias();
    this.cargarAlmacenes();
    this.cargarUnidades();
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

  crearProducto(): void {
    if (this.productoForm.valid) {
      this.isSubmitting = true;
      this.productoForm.disable();

      const request = this.productoForm.value;
      const imagen = this.productoForm.get('imagen')?.value;

      this.productoService.crearProducto(request, imagen).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.productoForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.productoForm.enable();
          this.alertService.showSuccess("Producto creado con éxito.")
        }
      });
    } 
  }

  cancelarCreacion(): void {
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
