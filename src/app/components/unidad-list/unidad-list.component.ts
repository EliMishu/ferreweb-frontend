import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Unidad } from '../../models/unidad.model';
import { UnidadService } from '../../services/unidad.service';

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

  constructor(private unidadService: UnidadService) {}

  ngOnInit(): void {
      this.obtenerUnidades();
  }

  obtenerUnidades(): void {
    this.unidadService.filtrarUnidades(this.searchTerm).subscribe((data) => {
      this.unidades = data;
    })
  }

  eliminarUnidadPorId(id: number): void {
    this.unidadService.eliminarUnidad(id).subscribe(() => {
      this.obtenerUnidades();
    });
  }
}
