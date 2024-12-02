import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rol-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './rol-list.component.html',
  styleUrl: './rol-list.component.css'
})
export class RolListComponent implements OnInit {
  roles: Rol[] = [];
  searchTerm: string = '';

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles(): void {
    this.rolService.filtrarRoles(this.searchTerm).subscribe((data) => {
      this.roles = data;
    })
  }

  eliminarRolPorId(id: number): void {
    this.rolService.eliminarRol(id).subscribe(() => {
      this.obtenerRoles();
    })
  }
}
