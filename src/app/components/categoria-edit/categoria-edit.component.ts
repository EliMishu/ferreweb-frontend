import { Component, OnInit } from '@angular/core';
import { CategoriaRequest } from '../../models/categoria-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoria-edit.component.html',
  styleUrl: './categoria-edit.component.css'
})
export class CategoriaEditComponent implements OnInit {
  categoriaForm: FormGroup;
  categoriaId!: number;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.categoriaService.obtenerCategoria(this.categoriaId).subscribe((data: Categoria) => {
      this.categoriaForm.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
      });
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.categoriaForm.patchValue({
      imagen: file
    });
  }

  guardarCategoria(): void {
    if (this.categoriaForm.valid) {
      const request = this.categoriaForm.value;
      const imagen = this.categoriaForm.get('imagen')?.value;

      this.categoriaService.actualizarCategoria(this.categoriaId, request, imagen).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => console.error('Error al actualizar la categoría', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/categorias']);
  }
}