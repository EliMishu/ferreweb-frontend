import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../models/categoria.models';
import { CategoriaService } from '../../services/categoria.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(data => {
      this.categorias = data;
    });
  }
}
