import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { Venta } from '../../models/venta.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './venta-detail.component.html',
  styleUrl: './venta-detail.component.css'
})
export class VentaDetailComponent implements OnInit {
  venta: Venta | null = null;
  ventaId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.ventaId = Number(this.route.snapshot.paramMap.get('idVenta'));
    this.obtenerProducto();
  }

  obtenerProducto(): void {
    this.ventaService.obtenerVentaPorId(this.ventaId).subscribe((data: Venta) => {
      this.venta = data;
    });
  }

  regresar(): void {
    this.router.navigate(['/ventas']);
  }
}