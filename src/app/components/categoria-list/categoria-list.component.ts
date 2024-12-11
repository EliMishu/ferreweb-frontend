import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  searchTerm: string = '';
  categoriaSeleccionada: Categoria | null = null;

  constructor(private categoriaService: CategoriaService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.filtrarCategorias(this.searchTerm).subscribe((data) => {
      this.categorias = data;
    });
  }

  eliminarCategoriaPorId(id: number): void {
    this.categoriaService.eliminarCategoria(id).subscribe({
      next: () => {
        this.obtenerCategorias();
      },
      error: (err) => {
        this.alertService.showError(err.error.message);
      },
      complete: () => {
        this.alertService.showSuccess('Categoría eliminada con éxito.');
      }
    });
  }

  selectCategoria(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
  }

  confirmarEliminacion(): void {
    if (this.categoriaSeleccionada) {
      this.eliminarCategoriaPorId(this.categoriaSeleccionada.idCategoria);
      this.categoriaSeleccionada = null;
    }
  }
}
