import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Unidad } from '../../models/unidad.model';
import { UnidadService } from '../../services/unidad.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-unidad-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './unidad-list.component.html',
  styleUrl: './unidad-list.component.css'
})
export class UnidadListComponent implements OnInit {
  unidades: Unidad[] = [];
  searchTerm: string = '';
  unidadSeleccionada: Unidad | null = null;

  constructor(private unidadService: UnidadService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
      this.obtenerUnidades();
  }

  obtenerUnidades(): void {
    this.unidadService.filtrarUnidades(this.searchTerm).subscribe((data) => {
      this.unidades = data;
    })
  }

  eliminarUnidadPorId(id: number): void {
    this.unidadService.eliminarUnidad(id).subscribe({
      next: () => {
        this.obtenerUnidades();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Unidad eliminada con éxito.');
      }
    });
  }

  selectUnidad(unidad: Unidad): void {
    this.unidadSeleccionada = unidad;
  }

  confirmarEliminacion(): void {
    if (this.unidadSeleccionada) {
      this.eliminarUnidadPorId(this.unidadSeleccionada.idUnidad);
      this.unidadSeleccionada = null;
    }
  }
}
