import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../../models/proveedor.model';
import { Producto } from '../../models/producto.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { ProductoService } from '../../services/producto.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CotizacionService } from '../../services/cotizacion.service';
import { fechaLimiteValidator } from '../../validations/validations';

@Component({
  selector: 'app-solicitud-cotizacion',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './solicitud-cotizacion.component.html',
  styleUrl: './solicitud-cotizacion.component.css'
})
export class SolicitudCotizacionComponent implements OnInit {
  cotizacionForm: FormGroup;
  isSubmitting: boolean = false;
  proveedores: Proveedor[] = [];
  productos: Producto[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private cotizacionService: CotizacionService,
    private productoService: ProductoService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.cotizacionForm = this.fb.group({
      idProveedores: [[], [Validators.required, Validators.minLength(1)]],
      idProductos: [[], [Validators.required]],
      fechaLimite: ['', [Validators.required, fechaLimiteValidator(3)]]
    });
  }

  ngOnInit(): void {
    this.obtenerProveedores();
    this.obtenerProductos();
  }

  obtenerProveedores(): void {
    this.proveedorService.obtenerProveedores().subscribe((data) => {
      this.proveedores = data;
    });
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  solicitarCotizacion(): void {
    if (this.cotizacionForm.valid) {
      this.isSubmitting = true;
      this.cotizacionForm.disable();

      const request = this.cotizacionForm.value;

      this.cotizacionService.solicitarCotizaciones(request).subscribe({
        next: (res) => {
          console.log();
          this.router.navigate(['/proveedores']);
          this.alertService.showSuccess(res);
        },
        error: (err) => {
          console.log(err);
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmitting = false;
          this.cotizacionForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.cotizacionForm.enable();
        }
      });
    }
  }

  cancelarSolicitud(): void {
    this.router.navigate(['/proveedores']);
  }
}