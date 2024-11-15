import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rol-list.component.html',
  styleUrl: './rol-list.component.css'
})
export class RolListComponent implements OnInit {
  roles: Rol[] = [];
  idRol: number = -1;

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.rolService.obtenerRoles().subscribe((data) => {
      this.roles = data;
    })
  }

  eliminarRolPorId(id: number): void {
    this.rolService.eliminarRol(id).subscribe(() => {
      this.obtenerRoles();
    })
  }

  eliminarRol(): void {
    this.eliminarRolPorId(this.idRol);
  }

  seleccionarRol(id: number): void {
    this.idRol = id;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardClicked = target.closest('.card');
    const buttonClicked = target.closest('.btn')

    if (!cardClicked && !buttonClicked) {
      this.idRol = -1;
    }
  }
}
