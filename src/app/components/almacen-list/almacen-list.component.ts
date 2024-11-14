import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Almacen } from '../../models/almacen.model';
import { AlmacenService } from '../../services/almacen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-almacen-list',
  standalone: true,
  imports: [CommonModule ,RouterModule],
  templateUrl: './almacen-list.component.html',
  styleUrl: './almacen-list.component.css'
})
export class AlmacenListComponent {
  almacenes: Almacen[] = [];
  idAlmacen: number = -1;

  constructor(private almacenService: AlmacenService) {}

  ngOnInit(): void {
    this.obtenerAlmacenes();
  }

  obtenerAlmacenes(): void {
    this.almacenService.obtenerAlmacenes().subscribe((data) => {
      this.almacenes = data;
    })
  }

  eliminarAlmacen(id: number): void {
    this.almacenService.eliminarAlmacen(id).subscribe(() => {
      this.obtenerAlmacenes();
    })
  }

  seleccionarAlmacen(id: number): void {
    this.idAlmacen = id;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const cardClicked = target.closest('.card');
    const buttonClicked = target.closest('.btn')

    if (!cardClicked && !buttonClicked) {
      this.idAlmacen = -1;
    }
  }
}
