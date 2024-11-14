import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-create.component.html',
  styleUrl: './producto-create.component.css'
})
export class ProductoCreateComponent implements OnInit  {
  productoForm: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.productoForm = this.fb.group({
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
    this.productoForm.patchValue({
      imagen: file
    });
  }

  crearProducto(): void {
    if (this.productoForm.valid) {
      const request = this.productoForm.value;
      const imagen = this.productoForm.get('imagen')?.value;

      this.productoService.crearProducto(request, imagen).subscribe({
        next: () => this.router.navigate(['/productos']),
        error: (err: Error) => console.error('Error al crear el producto', err)
      });
    }
  }

  cancelarCreacion(): void {
    this.router.navigate(['/productos']);
  }
}
