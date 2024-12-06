import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlmacenService } from '../../services/almacen.service';
import { Almacen } from '../../models/almacen.model';
import { AlertService } from '../../services/alert.service';

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
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private alertService: AlertService,
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
    this.almacenId = Number(this.route.snapshot.paramMap.get('idAlmacen'));
    this.cargarAlmacen();
  }

  cargarAlmacen(): void {
    this.almacenService.obtenerAlmacen(this.almacenId).subscribe((data: Almacen) => {
      this.almacenForm.patchValue({
        nombre: data.nombre,
        direccion: data.direccion,
      });
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.almacenForm.patchValue({
      imagen: file
    });
  }

  guardarAlmacen(): void {
    if (this.almacenForm.valid) {
      this.isSubmiting = true;
      this.almacenForm.disable();

      const request = this.almacenForm.value;

      this.almacenService.actualizarAlmacen(this.almacenId, request).subscribe({
        next: () => this.router.navigate(['/almacenes']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.almacenForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.almacenForm.enable();
          this.alertService.showSuccess("Almacén actualizado con éxito.")
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/almacenes']);
  }
}
