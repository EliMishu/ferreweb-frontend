import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-almacen-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen-create.component.html',
  styleUrl: './almacen-create.component.css'
})
export class AlmacenCreateComponent implements OnInit {
  almacenForm: FormGroup;
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private almacenService: AlmacenService,
    private router: Router
  ) {
    this.almacenForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.almacenForm.patchValue({
      imagen: file
    });
  }

  crearAlmacen(): void {
    if (this.almacenForm.valid) {
      this.isSubmiting = true;
      this.almacenForm.disable();

      const request = this.almacenForm.value;

      this.almacenService.crearAlmacen(request).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.almacenForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.almacenForm.enable();
          this.alertService.showSuccess("Almacen creado exitosamente.");
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/almacenes']);
  }
}
