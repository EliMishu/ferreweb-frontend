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
  isSubmiting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.rolForm = this.fb.group({
      tipo: ['', [Validators.required, Validators.minLength(2)]],
      imagen: [null]
    });
  }

  ngOnInit(): void {
    this.rolId = Number(this.route.snapshot.paramMap.get('idRol'));
    this.cargarRol();
  }

  cargarRol(): void {
    this.rolService.obtenerRolporId(this.rolId).subscribe((data: Rol) => {
      this.rolForm.patchValue({
        tipo: data.tipo
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
      this.isSubmiting = true;
      this.rolForm.disable();

      const request = this.rolForm.value;
      const imagen = this.rolForm.get('imagen')?.value;

      this.rolService.actualizarRol(this.rolId, request, imagen).subscribe({
        next: () => this.router.navigate(['/roles']),
        error: (err) => {
          this.alertService.showErrorWithTitle(err.statusText, err.error.message);
          this.isSubmiting = false;
          this.rolForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.rolForm.enable();
          this.alertService.showSuccess("Rol actualizado con éxito.")
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/roles']);
  }
}
