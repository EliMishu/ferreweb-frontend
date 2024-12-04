import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Almacen } from '../../models/almacen.model';
import { AlmacenService } from '../../services/almacen.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-almacen-list',
  standalone: true,
  imports: [CommonModule ,RouterModule, FormsModule],
  templateUrl: './almacen-list.component.html',
  styleUrl: './almacen-list.component.css'
})
export class AlmacenListComponent implements OnInit {
  almacenes: Almacen[] = [];
  searchTerm: string = '';

  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    this.obtenerAlmacenes();
  }

  obtenerAlmacenes(): void {
    this.almacenService.filtrarAlmacenes(this.searchTerm).subscribe((data) => {
      this.almacenes = data;
    })
  }

  eliminarAlmacenPorId(id: number): void {
    this.almacenService.eliminarAlmacen(id).subscribe(() => {
      this.obtenerAlmacenes();
    })
  }
}
