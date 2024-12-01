import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

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
      const { user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno } = this.registerForm.value;

      this.authService.register(
        user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno
      ).subscribe({
        error: (err) => this.alertService.showError(err.error.message)
      });
    } else {
      this.alertService.showError("Complete todos los campos");
    }
  }
}
