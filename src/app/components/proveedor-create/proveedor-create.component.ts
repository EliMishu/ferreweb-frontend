import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { getImageTypes } from '../../constants/image.constants';

@Component({
  selector: 'app-proveedor-create',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './proveedor-create.component.html',
  styleUrl: './proveedor-create.component.css'
})
export class ProveedorCreateComponent implements OnInit {
  proveedorForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.proveedorForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern('^\\d{11}$')]],
      nombre: ['', [Validators.required]],
      nombreComercial: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^9\\d{8}$')]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  crearProveedor(): void {
    if (this.proveedorForm.valid) {
      this.isSubmitting = true;
      this.proveedorForm.disable();

      const request = this.proveedorForm.value;

      this.proveedorService.crearProveedor(request).subscribe({
        next: () => this.router.navigate(['/proveedores']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmitting = false;
          this.proveedorForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.proveedorForm.enable();
        }
      });
    }
  }

  getImageTypes(): string {
    return getImageTypes().join(", ");
  }

  cancelarCreacion(): void {
    this.router.navigate(['/proveedores']);
  }
}
