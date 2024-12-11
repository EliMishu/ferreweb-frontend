import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UnidadService } from '../../services/unidad.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-unidad-create',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './unidad-create.component.html',
  styleUrl: './unidad-create.component.css'
})
export class UnidadCreateComponent implements OnInit {
  unidadForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private unidadService: UnidadService,
    private router: Router
  ) {
    this.unidadForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ngOnInit(): void {}

  guardarUnidad(): void {
    if (this.unidadForm.valid) {
      this.isSubmitting = true;

      const unidadData = this.unidadForm.value;

      this.unidadService.crearUnidad(unidadData).subscribe({
        next: () => this.router.navigate(['/unidades']),
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.unidadForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.unidadForm.enable();
          this.alertService.showSuccess("Rol actualizado con éxito.")
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/unidades']);
  }
}
