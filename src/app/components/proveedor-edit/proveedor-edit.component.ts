import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-proveedor-edit',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './proveedor-edit.component.html',
  styleUrl: './proveedor-edit.component.css'
})
export class ProveedorEditComponent implements OnInit {
  proveedorForm: FormGroup;
  isSubmitting = false;
  idProveedor!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private proveedorService: ProveedorService
  ) {
    this.proveedorForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/), Validators.maxLength(11)]],
      nombre: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)]],
      direccion: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.idProveedor = Number(this.route.snapshot.paramMap.get('idProveedor'));
    this.cargarProveedor();
  }

  cargarProveedor(): void {
    if (!this.idProveedor) return;

    this.proveedorService.obtenerProveedorPorId(this.idProveedor).subscribe((proveedor) => {
      this.proveedorForm.patchValue({
        ruc: proveedor.ruc,
        nombre: proveedor.nombre,
        nombreComercial: proveedor.nombreComercial,
        email: proveedor.email,
        telefono: proveedor.telefono,
        direccion: proveedor.direccion,
      });
    });
  }

  actualizarProveedor(): void {
    if (this.proveedorForm.invalid) return;
    this.isSubmitting = true;
    this.proveedorForm.disable();

    const request = this.proveedorForm.value;

    this.proveedorService.actualizarProveedor(this.idProveedor, request).subscribe({
      next: () => this.router.navigate(['/proveedores']),
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.proveedorForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.proveedorForm.enable();
          this.alertService.showSuccess("Rol actualizado con éxito.")
        }
    });
  }

  cancelarEdicion(): void {
    this.router.navigate(['/proveedores']);
  }
}