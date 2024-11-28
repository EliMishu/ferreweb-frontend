import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  rol: string | null = null;

  constructor(private authService: AuthService, private rolService: RolService) {}

  ngOnInit(): void {
    this.rol = this.rolService.obtenerRolSeleccionado();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getSelectedRol(): string {
    if (this.rol) {
      return this.rol;
    } else {
      return "";
    }
  }

  logout(): void {
    this.authService.logout();
    this.rolService.limpiarRolSeleccionado();
    window.location.reload();
  }

  obtenerInicio(): string {
    if (this.rol) {
      if (this.rol === "ADMIN") return "admin";
    } 

    return "/";
  }
}
