import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { imagenValidator } from '../../validations/validations';
import { getImageTypes } from '../../constants/image.constants';

@Component({
  selector: 'app-rol-create',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule
  ],
  templateUrl: './rol-create.component.html',
  styleUrl: './rol-create.component.css'
})
export class RolCreateComponent {
  rolForm: FormGroup;
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.rolForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      imagen: [null, [Validators.required, imagenValidator()]]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.rolForm.patchValue({
      imagen: file
    });
  }

  crearRol(): void {
    if (this.rolForm.valid) {
      this.isSubmiting = true;
      this.rolForm.disable();

      const request = this.rolForm.value;
      const imagen = this.rolForm.get('imagen')?.value;

      this.rolService.crearRol(request, imagen).subscribe({
        next: () => this.router.navigate(['/roles']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.rolForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.rolForm.enable();
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/roles']);
  }

  getImageTypes(): string {
    return getImageTypes().join(', ');
  }
}
