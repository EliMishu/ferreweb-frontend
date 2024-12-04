import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-modulo-compras',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modulo-compras.component.html',
  styleUrl: './modulo-compras.component.css'
})
export class ModuloComprasComponent implements OnInit {
  proveedoresInfo: number = 0;

  constructor (
    private router: Router,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
      this.cargarInfoDeProveedores();
  }

  cargarInfoDeProveedores() {
    this.proveedorService.contarProveedores().subscribe((data) => {
      this.proveedoresInfo = data;
    });
  }
}
