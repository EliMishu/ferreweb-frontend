import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlmacenService } from '../../services/almacen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-almacen-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './almacen-create.component.html',
  styleUrl: './almacen-create.component.css'
})
export class AlmacenCreateComponent implements OnInit {
  almacenForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private almacenService: AlmacenService,
    private router: Router
  ) {
    this.almacenForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      descripcion: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]],
      almacen: [null, Validators.required],
      categoria: [null, Validators.required],
      imagen: [null]
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
      const request = this.almacenForm.value;
      const imagen = this.almacenForm.get('imagen')?.value;

      this.almacenService.crearAlmacen(request).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: (err: Error) => console.error('Error al crear el almacen', err)
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/almacenes']);
  }
}
