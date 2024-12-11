import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { getImageTypes } from '../../constants/image.constants';
import { imagenValidator } from '../../validations/validations';
  
@Component({
  selector: 'app-categoria-create',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgxMatFileInputModule
  ],
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent {
  categoriaForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      imagen: [null, [imagenValidator()]]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.categoriaForm.patchValue({
      imagen: file
    });
  }

  get selectedFile(): any {
    return this.categoriaForm.get('imagen') as unknown as File;
  }

  crearCategoria(): void {
    if (this.categoriaForm.valid) {
      this.isSubmitting = true;
      this.categoriaForm.disable();

      const request = this.categoriaForm.value;
      const imagen = this.categoriaForm.get('imagen')?.value;

      this.categoriaService.crearCategoria(request, imagen).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.categoriaForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.categoriaForm.enable();
          this.alertService.showSuccess("Producto creado con éxito.")
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/categorias']);
  }

  getImageTypes(): string {
    return getImageTypes().join(', ')
  }
}