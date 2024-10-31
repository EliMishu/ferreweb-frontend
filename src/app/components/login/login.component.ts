import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      user: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { user, contrasena } = this.loginForm.value;
      console.log(user);
  
      this.authService.login(user, contrasena).subscribe({
        next: () => this.router.navigate(['/modProductos']),
        error: (err) => console.error('Login failed', err)
      });
    }
  }
}
