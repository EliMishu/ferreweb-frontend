import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolService } from '../../services/rol.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Rol } from '../../models/rol.model';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rol-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './rol-edit.component.html',
  styleUrl: './rol-edit.component.css'
})
export class RolEditComponent {
  rolForm: FormGroup;
  rolId!: number;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.rolForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.rolId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarRol();
  }

  cargarRol(): void {
    this.rolService.obtenerRolporId(this.rolId).subscribe((data: Rol) => {
      this.rolForm.patchValue({
        nombre: data.tipo
      });
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.rolForm.patchValue({
      imagen: file
    });
  }

  guardarRol(): void {
    if (this.rolForm.valid) {
      const request = this.rolForm.value;
      const imagen = this.rolForm.get('imagen')?.value;

      this.rolService.actualizarRol(this.rolId, request, imagen).subscribe({
        next: () => this.router.navigate(['/categorias']),
        error: (err) => this.alertService.show("Error al actualizar la categoría.")
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/roles']);
  }
}
