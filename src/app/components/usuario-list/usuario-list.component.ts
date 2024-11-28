import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[] = [];
  idUsuario: number = -1;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
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

  eliminarUsuario(): void {
    this.usuarioService.eliminarUsuario(this.idUsuario).subscribe(() => {
      this.obtenerUsuarios();
    });
  }

  seleccionarUsuario(id: number): void {
    this.idUsuario = id;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardClicked = target.closest('.card');
    const buttonClicked = target.closest('.btn');

    if (!cardClicked && !buttonClicked) {
      this.idUsuario = -1;
    }
  }
}
