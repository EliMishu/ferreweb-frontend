import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { Almacen } from '../../models/almacen.model';

@Component({
  selector: 'app-almacen-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen-edit.component.html',
  styleUrl: './almacen-edit.component.css'
})
export class AlmacenEditComponent {
  almacenForm: FormGroup;
  almacenId!: number;

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.almacenForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      direccion: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.almacenId = Number(this.route.snapshot.paramMap.get('idCategoria'));
    console.log(this.almacenId);
    this.cargarCategoria();
  }

  cargarCategoria(): void {
    this.almacenService.obtenerAlmacen(this.almacenId).subscribe((data: Almacen) => {
      this.almacenForm.patchValue({
        nombre: data.nombre,
        descripcion: data.direccion,
      });
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.almacenForm.patchValue({
      imagen: file
    });
  }

  guardarCategoria(): void {
    if (this.almacenForm.valid) {
      const request = this.almacenForm.value;
      const imagen = this.almacenForm.get('imagen')?.value;

      this.almacenService.actualizarAlmacen(this.almacenId, request).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: (err) => console.error('Error al actualizar la categoría', err)
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/categorias']);
  }
}
