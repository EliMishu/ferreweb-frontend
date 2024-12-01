import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { AlertService } from '../../services/alert.service';
import { UsuarioRequest } from '../../models/usuario-req.model';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './usuario-edit.component.html',
  styleUrl: './usuario-edit.component.css',
})
export class UsuarioEditComponent {
  usuarioForm: FormGroup;
  usuarioId!: number;
  isSubmiting: boolean = false;
  roles: string[] = [];
  rolesSeleccionados: string[] = [];

  constructor(
    private fb: FormBuilder,
    private rolService: RolService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.usuarioForm = this.fb.group({
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidoPat: ['', Validators.required],
      apellidoMat: ['', Validators.required],
      direccion: [''],
      roles: [[], Validators.minLength(1)],
      imagen: [null],
    });
  }

  ngOnInit(): void {
    this.usuarioId = Number(this.route.snapshot.paramMap.get('idUsuario'));
    this.cargarRoles();
    this.cargarUsuario();
  }

  cargarRoles(): void {
    this.rolService.obtenerRoles().subscribe((data) => {
      this.roles = data.map((rol) => rol.tipo);
    });
  }

  cargarUsuario(): void {
    this.usuarioService
      .obtenerUsuarioPorId(this.usuarioId)
      .subscribe((data) => {
        this.usuarioForm.patchValue({
          dni: data.dni,
          username: data.username,
          nombre: data.nombre,
          apellidoPat: data.apellidoPat,
          apellidoMat: data.apellidoMat,
          direccion: data.direccion,
        });

        this.rolesSeleccionados = data.roles.map((rol) => rol.tipo);

        if (!this.rolesSeleccionados.includes('USUARIO')) {
          this.rolesSeleccionados.push('USUARIO');
        }
      });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.usuarioForm.patchValue({
      imagen: file,
    });
  }

  onRolPressed(rolSeleccionado: string): void {
    if (!this.rolesSeleccionados.includes(rolSeleccionado)) {
      this.rolesSeleccionados.push(rolSeleccionado);
    } else {
      this.rolesSeleccionados.splice(
        this.rolesSeleccionados.indexOf(rolSeleccionado),
        1
      );
    }

    this.usuarioForm.patchValue({
      roles: this.rolesSeleccionados,
    });
  }

  guardarUsuario(): void {
    if (this.usuarioForm.valid) {
      this.isSubmiting = true;
      this.usuarioForm.disable();

      const request = this.usuarioForm.value;
      const imagen = this.usuarioForm.get('imagen')?.value;

      this.usuarioService
        .actualizarUsuario(this.usuarioId, request, imagen)
        .subscribe({
          next: () => this.router.navigate(['/usuarios']),
          error: (err) => {
            this.alertService.showErrorWithTitle(
              err.statusText,
              err.error.message
            );
            this.isSubmiting = false;
            this.usuarioForm.enable();
          },
          complete: () => {
            this.isSubmiting = false;
            this.usuarioForm.enable();
          },
        });
    }
  }

  cancelarEdicion(): void {
    this.router.navigate(['/usuarios']);
  }
}
