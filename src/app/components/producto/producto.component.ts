import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [NgFor],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {
  productos: Producto[] = [];

    constructor(private productoService: ProductoService) {}

    ngOnInit(): void {
        //this.productoService.getProductos().subscribe(data => {
        //    this.productos = data;
        //});
    }
}
