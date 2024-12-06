import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isSubmiting: boolean = false;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private alertService: AlertService) {
    this.registerForm = this.fb.group({
      user: ['', [Validators.required, Validators.pattern(/^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|(?:\+51\s*)?9\d{2}[-\s]?\d{3}[-\s]?\d{3})$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.registerForm.valid) {
      this.isSubmiting = true;
      this.registerForm.disable();

      const { user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno } = this.registerForm.value;

      this.authService.register(
        user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno
      ).subscribe({
        next: (res) => {
          this.redirect(res.usuario);
        },
        error: (err) => {
          this.alertService.showErrorWithTitle("Registro fallido", err.error.message);
          this.isSubmiting = false;
          this.registerForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.registerForm.enable();
        }
      });
    }
  }

  private redirect(usuario: Usuario) {
    if (usuario.roles.length > 1) {
      this.router.navigate(['/rol/selection'])
        .then(()=> {
          this.alertService.showSuccessWithTitle("Registro Exitoso", `Bienvenido ${usuario.nombre} ${usuario.apellidoPat}`);
        });
    } else {
      this.router.navigate(['/'])
        .then(()=> {
          this.alertService.showSuccessWithTitle("Registro Exitoso", `Bienvenido ${usuario.nombre} ${usuario.apellidoPat}`);
        });
    }
  }
}
