import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProveedorService } from '../../services/proveedor.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-proveedor-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proveedor-create.component.html',
  styleUrl: './proveedor-create.component.css'
})
export class ProveedorCreateComponent implements OnInit {
  proveedorForm: FormGroup;
  isSubmiting: boolean = false;

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
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
      
  }

  crearProveedor(): void {
    if (this.proveedorForm.valid) {
      this.isSubmiting = true;
      this.proveedorForm.disable();

      const request = this.proveedorForm.value;

      this.proveedorService.crearProveedor(request).subscribe({
        next: () => this.router.navigate(['/proveedores']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.proveedorForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.proveedorForm.enable();
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/proveedores']);
  }
}
