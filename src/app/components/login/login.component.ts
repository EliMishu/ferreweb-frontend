import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';
import { Usuario } from '../../models/usuario.model';
import { delay } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmiting: boolean = false;

  constructor(private fb: FormBuilder, 
              private authService: AuthService, 
              private router: Router,
              private alertService: AlertService) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isSubmiting = true;
      this.loginForm.disable();
      const { user, contrasena } = this.loginForm.value;

      this.authService.login(user, contrasena).subscribe({
        next: (res) => {
          this.redirect(res.usuario);
        },
        error: (err) => {
          this.alertService.showErrorWithTitle("Login fallido", err.error.message);
          this.isSubmiting = false;
          this.loginForm.enable();
        },
        complete: () => {
          this.isSubmiting = false;
          this.loginForm.enable();
        }
      });
    }
  }

  private redirect(usuario: Usuario) {
    if (usuario.roles.length > 1) {
      this.router.navigate(['/rol/selection'])
        .then(()=> {
          this.alertService.showSuccessWithTitle("Login Exitoso", `Bienvenido ${usuario.nombre} ${usuario.apellidoPat}`);
        });
    } else {
      this.router.navigate(['/'])
        .then(()=> {
          this.alertService.showSuccessWithTitle("Login Exitoso", `Bienvenido ${usuario.nombre} ${usuario.apellidoPat}`);
        });
    }
  }
}
