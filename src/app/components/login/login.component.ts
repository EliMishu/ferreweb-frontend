import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

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
      const { user, contrasena } = this.loginForm.value;

      this.authService.login(user, contrasena).subscribe({
        error: (err) => this.alertService.show(err.error.message)
      });
    } else {
      this.alertService.show("Complete todos los campos")
    }
  }
}
