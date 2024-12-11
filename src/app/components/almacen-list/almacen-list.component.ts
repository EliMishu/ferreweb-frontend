import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Almacen } from '../../models/almacen.model';
import { AlmacenService } from '../../services/almacen.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-almacen-list',
  standalone: true,
  imports: [CommonModule ,RouterModule, FormsModule],
  templateUrl: './almacen-list.component.html',
  styleUrl: './almacen-list.component.css'
})
export class AlmacenListComponent implements OnInit {
  almacenes: Almacen[] = [];
  searchTerm: string = '';
  almacenSeleccionado: Almacen | null = null;

  constructor(
    private almacenService: AlmacenService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.obtenerAlmacenes();
  }

  obtenerAlmacenes(): void {
    this.almacenService.filtrarAlmacenes(this.searchTerm).subscribe((data) => {
      this.almacenes = data;
    })
  }

  eliminarAlmacenPorId(id: number): void {
    this.almacenService.eliminarAlmacen(id).subscribe({
      next: () => {
        this.obtenerAlmacenes();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Almacén eliminado con éxito.');
      }
    })
  }

  selectAlmacen(almacen: Almacen): void {
    this.almacenSeleccionado = almacen;
  }
  
  confirmarEliminacion(): void {
    if (this.almacenSeleccionado) {
      this.eliminarAlmacenPorId(this.almacenSeleccionado.idAlmacen);
      this.almacenSeleccionado = null;
    }
  }
}
