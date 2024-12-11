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
import { RolService } from '../../services/rol.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-usuario-edit',
  standalone: true,
  imports: [CommonModule, 
    RouterModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
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
      roles: [[], Validators.minLength(1)]
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

        this.usuarioForm.get('dni')?.disable();
        this.usuarioForm.get('username')?.disable();
        this.usuarioForm.get('nombre')?.disable();
        this.usuarioForm.get('apellidoPat')?.disable();
        this.usuarioForm.get('apellidoMat')?.disable();
        this.usuarioForm.get('direccion')?.disable();

        this.rolesSeleccionados = data.roles.map((rol) => rol.tipo);

        if (!this.rolesSeleccionados.includes('USUARIO')) {
          this.rolesSeleccionados.push('USUARIO');
        }
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

      this.usuarioService
        .actualizarUsuario(this.usuarioId, request)
        .subscribe({
          next: () => this.router.navigate(['/usuarios']),
          error: (err) => {
            console.log(err)
            this.alertService.showError(err.error.message);
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
