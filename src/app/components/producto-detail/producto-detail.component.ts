import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css'
})
export class ProductoDetailComponent implements OnInit {
  producto: Producto | null = null;
  productoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.productoId = Number(this.route.snapshot.paramMap.get('idProducto'));
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    this.productoService.obtenerProducto(this.productoId).subscribe((data: Producto) => {
      this.producto = data;
    });
  }

  regresar(): void {
    this.router.navigate(['/productos']);
  }
}