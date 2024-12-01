import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  searchTerm: string = '';
  rol: string = '';
  estado: string = '';

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rol = params['rol'] || '';
      this.estado = params['estado'] || '';

      this.obtenerUsuarios();
    });

    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.filtrarUsuarios(this.searchTerm, this.rol, this.estado).subscribe((data) => {
      this.usuarios = data;

      this.usuarios.sort((a, b) => {
        const fechaA = this.convertirFecha(a.fechaEliminacion);
        const fechaB = this.convertirFecha(b.fechaEliminacion);
        
        if (fechaA === null && fechaB !== null) return -1;
        if (fechaA !== null && fechaB === null) return 1;
        
        if (fechaA && fechaB) {
          return fechaA.getTime() - fechaB.getTime();
        }

        return 0;
      });
    });
  }

  filtrarUsuarios(): void {
    this.obtenerUsuarios();
  }

  private convertirFecha(fechaStr: string | null): Date | null {
    if (!fechaStr) return null;
    const [dia, mes, año] = fechaStr.split('/');
    return new Date(parseInt(año), parseInt(mes) - 1, parseInt(dia));
  }

  eliminarUsuarioPorId(id: number): void {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.obtenerUsuarios();
    });
  }
}
