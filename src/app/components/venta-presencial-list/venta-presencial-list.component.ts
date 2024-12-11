import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Venta } from '../../models/venta.model';
import { AlertService } from '../../services/alert.service';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-venta-presencial-list',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './venta-presencial-list.component.html',
  styleUrl: './venta-presencial-list.component.css'
})
export class VentaPresencialListComponent implements OnInit {
  ventas: Venta[] = [];
  searchTerm: string = '';

  constructor(
    private alertService: AlertService,
    private ventaService: VentaService
  ) {}

  ngOnInit(): void {
    this.obtenerVentas();
  }

  obtenerVentas(): void {
    this.ventaService
      .filtrarVentasPresenciales(this.searchTerm)
      .subscribe((data) => {
        this.ventas = data;
      });
  }
}