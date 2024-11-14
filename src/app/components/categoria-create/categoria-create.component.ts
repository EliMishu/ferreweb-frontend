import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule } from '@angular/common';
  
@Component({
  selector: 'app-categoria-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-create.component.html',
  styleUrl: './categoria-create.component.css'
})
export class CategoriaCreateComponent {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
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
      const request = this.categoriaForm.value;
      const imagen = this.categoriaForm.get('imagen')?.value;

      this.categoriaService.crearCategoria(request, imagen).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err: Error) => console.error('Error al crear la categoría', err)
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/categorias']);
  }
}