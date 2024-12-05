import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-proveedor-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.css'
})
export class ProveedorListComponent implements OnInit {
  proveedores: Proveedor[] = [];
  searchTerm: string = '';

  constructor (private proveedorService: ProveedorService) {}

  ngOnInit(): void {
      this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this.proveedorService.filtrarProveedores(this.searchTerm).subscribe((data) => {
      this.proveedores = data;
    });
  }

  eliminarProveedorPorId(id: number): void {
    this.proveedorService.eliminarProveedor(id);
  }
}
