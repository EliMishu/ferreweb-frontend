import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css'
})
export class ProductoListComponent implements OnInit {
  productos: Producto[] = [];
  idProducto: number = -1;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe((data) => {
      this.productos = data;
    })
  }

  eliminarProducto(id: number): void {
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.obtenerProductos();
    })
  }

  seleccionarProducto(id: number): void {
    this.idProducto = id;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const listaCategorias = document.querySelector('.producto-container');

    if (listaCategorias && !listaCategorias.contains(target)) {
      this.idProducto = -1;
    }
  }
}
