import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  idCategoria: number = -1;

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.obtenerCategorias(); 
  }

  obtenerCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  eliminarCategoriaPorId(id: number): void {
    this.categoriaService.eliminarCategoria(id).subscribe(() => {
      this.obtenerCategorias();
    });
  }

  eliminarCategoria(): void {
    this.categoriaService.eliminarCategoria(this.idCategoria).subscribe(() => {
      this.obtenerCategorias();
    })
  }

  seleccionarCategoria(id: number): void {
    this.idCategoria = id; 
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardClicked = target.closest('.card');
    const buttonClicked = target.closest('.btn')

    if (!cardClicked && !buttonClicked) {
      this.idCategoria = -1;
    }
  }
}
