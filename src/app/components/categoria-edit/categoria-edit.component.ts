import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/categoria.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { getImageTypes } from '../../constants/image.constants';
import { imagenValidator } from '../../validations/validations';

@Component({
  selector: 'app-categoria-edit',
  standalone: true,
  imports: [CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule
  ],
  templateUrl: './categoria-edit.component.html',
  styleUrl: './categoria-edit.component.css'
})
export class CategoriaEditComponent implements OnInit {
  categoriaForm: FormGroup;
  categoriaId!: number;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      imagen: [null, [imagenValidator()]]
    });
  }

  ngOnInit(): void {
    this.categoriaId = Number(this.route.snapshot.paramMap.get('idCategoria'));
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.categoriaService.obtenerCategoria(this.categoriaId).subscribe((data) => {
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
        error: (err) => {
          this.alertService.showWarning(err.error.message);
          this.isSubmitting = false;
          this.categoriaForm.enable();
        },
        complete: () => {
          this.isSubmitting = false;
          this.categoriaForm.enable();
          this.alertService.showSuccess("Categoría actualizada con éxito.")
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/categorias']);
  }

  getImageTypes(): string {
    return getImageTypes().join(', ');
  }
}
