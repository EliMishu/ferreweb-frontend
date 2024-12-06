import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
  
@Component({
  selector: 'app-categoria-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent {
  categoriaForm: FormGroup;
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private categoriaService: CategoriaService,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      imagen: [null]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.categoriaForm.patchValue({
      imagen: file
    });
  }

  crearCategoria(): void {
    if (this.categoriaForm.valid) {
      this.isSubmiting = true;
      this.categoriaForm.disable();

      const request = this.categoriaForm.value;
      const imagen = this.categoriaForm.get('imagen')?.value;

      this.categoriaService.crearCategoria(request, imagen).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.categoriaForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.categoriaForm.enable();
          this.alertService.showSuccess("Categoría creade con éxito.")
        }
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/categorias']);
  }
}