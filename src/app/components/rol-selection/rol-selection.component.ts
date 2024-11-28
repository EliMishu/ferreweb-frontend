import { Component, OnInit } from '@angular/core';
import { Rol } from '../../models/rol.model';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rol-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rol-selection.component.html',
  styleUrl: './rol-selection.component.css'
})
export class RolSelectionComponent implements OnInit {
  roles: Rol[] = [];
  
  constructor(
    private usuarioService: UsuarioService,
    private rolService: RolService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.usuarioService.obtenerUsuarioActual().subscribe({
      next: (usuario) => this.roles = usuario.roles
    })
  }

  seleccionarRol(tipo: string): void {
    this.rolService.establecerRolSeleccionado(tipo);
    
    switch(tipo) {
      case "ADMIN":
        this.router.navigate(['/admin'])
        .then(() => window.location.reload());
        break;
      default: 
        this.router.navigate(['/'])
        .then(() => window.location.reload());
    }
  }
}
