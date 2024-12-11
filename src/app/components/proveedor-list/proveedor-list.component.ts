import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Proveedor } from '../../models/proveedor.model';
import { ProveedorService } from '../../services/proveedor.service';
import { AlertService } from '../../services/alert.service';

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
  motivo: string = '';
  motivoError: string = '';
  proveedorSeleccionado: Proveedor | null = null;

  constructor(
    private route: ActivatedRoute,
    private alertService: AlertService,
    private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores(): void {
    this.proveedorService.filtrarProveedores(this.searchTerm).subscribe((data) => {
      this.proveedores = data;
    });
  }

  selectProveedor(proveedor: Proveedor): void {
    this.proveedorSeleccionado = proveedor;

    if (this.motivo.length === 0) {
      this.motivoError = "El motivo de eliminación es requerido.";
    } else if (this.motivo.length < 70) {
      this.motivoError = "El motivo debe tener al menos 70 caracteres.";
    } else {
      this.motivoError = '';
    }
  }

  confirmarEliminacion(): void {
    if (this.proveedorSeleccionado) {
      this.eliminarProveedorPorId(this.proveedorSeleccionado?.idProveedor);
      this.proveedorSeleccionado = null;
      this.motivo = '';
      this.motivoError = '';
    }
  }

  cancelarEliminacion(): void {
    this.motivo = '';
    this.motivoError = '';
  }

  motivoChange(): void {
    if (this.motivo.length === 0) {
      this.motivoError = "El motivo de eliminación es requerido.";
    } else if (this.motivo.length < 70) {
      this.motivoError = "El motivo debe tener al menos 70 caracteres.";
    } else {
      this.motivoError = '';
    }
  }

  eliminarProveedorPorId(idProveedor: number): void {
    if (this.motivo !== '') {
      if (this.motivoError !== '') return; 

      this.proveedorService.eliminarProveedor(idProveedor, this.motivo).subscribe({
        next: () => {
          this.obtenerProveedores();
        },
        error: (err) => {
          this.alertService.showError(err.error.message);
        },
        complete: () => {
          this.alertService.showSuccess('Proveedor eliminado con éxito.');
        }
      });
      this.motivo = '';
    }
  }
}