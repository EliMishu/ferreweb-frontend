import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrdenCompra } from '../../models/orden-compra.model';
import { OrdenCompraService } from '../../services/orden-compra.service';
import { AlertService } from '../../services/alert.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-compras-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './compras-list.component.html',
  styleUrl: './compras-list.component.css',
})
export class ComprasListComponent implements OnInit {
  compras: OrdenCompra[] = [];
  searchTerm: string = '';
  compraSeleccionada: OrdenCompra | null = null;
  modalTitle: string = '';
  modalAction: string = '';
  motivo: string = '';
  motivoError: string = '';

  constructor(
    private alertService: AlertService,
    private rolService: RolService,
    private ordenCompraService: OrdenCompraService
  ) {}

  ngOnInit(): void {
    this.obtenerCompras();
  }

  obtenerCompras(): void {
    this.ordenCompraService
      .filtrarOrdenes(this.searchTerm)
      .subscribe((data) => {
        this.compras = data;
      });
  }

  get rol() {
    return this.rolService.obtenerRolSeleccionado();
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

  selectCompra(compra: OrdenCompra, accion: string): void {
    this.compraSeleccionada = compra;
    this.modalAction = accion;

    switch (accion) {
      case 'aprobar':
        this.modalTitle = 'Confirmar Aprobación';
        break;
      case 'cancelar':
        this.modalTitle = 'Confirmar Cancelación';
        break;
      case 'procesar':
        this.modalTitle = 'Confirmar Procesamiento';
        break;
      case 'descargar':
        this.modalTitle = 'Confirmar Descarga';
        break;
      default:
        this.modalTitle = '';
    }
  }

  confirmarAccion(): void {
    if (this.compraSeleccionada && this.modalAction) {
      switch (this.modalAction) {
        case 'aprobar':
          this.aprobarCompra(this.compraSeleccionada);
          break;
        case 'cancelar':
          this.cancelarCompra(this.compraSeleccionada);
          break;
        case 'procesar':
          this.procesarCompra(this.compraSeleccionada);
          break;
        case 'descargar':
          this.descargarCompra(this.compraSeleccionada);
          break;
      }
    }
  }

  descargarCompra(orden: OrdenCompra) {
    this.ordenCompraService.descargarOrdenCompra(orden.idOrdenCompra);
  }

  procesarCompra(orden: OrdenCompra) {
    this.ordenCompraService.procesarEntrega(orden.idOrdenCompra).subscribe({
      next: () => {
        this.obtenerCompras();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Orden procesada con éxito.');
      }
    });
  }

  cancelarCompra(orden: OrdenCompra) {
    if (this.motivo !== '') {
      if (this.motivoError !== '') return;

      this.ordenCompraService.cancelarOrden(orden.idOrdenCompra, this.motivo).subscribe({
        next: () => {
          this.obtenerCompras();
        },
        error: (err) => {
          this.alertService.showError(err.error.message);
        },
        complete: () => {
          this.motivo = '';
          this.motivoError = '';
          this.alertService.showSuccess('Orden cancelada con éxito.');
        }
      });
    }
  }

  aprobarCompra(orden: OrdenCompra) {
    this.ordenCompraService.aprobarOrdenCompra(orden.idOrdenCompra).subscribe({
      next: () => {
        this.obtenerCompras();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Orden aprobada con éxito.');
      }
    });
  }
}
