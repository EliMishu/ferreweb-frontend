import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  filtrarCategorias(): void {
    if (this.searchTerm.length >= 2) {
      this.categoriaService.filtrarCategorias(this.searchTerm).subscribe((data) => {
        this.categorias = data;
      })
    }
  }

  eliminarCategoriaPorId(id: number): void {
    this.categoriaService.eliminarCategoria(id).subscribe(() => {
      this.obtenerCategorias();
    });
  }
}
