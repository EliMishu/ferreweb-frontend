import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Unidad } from '../models/unidad.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = environment.apiUrl + "/unidades"

  constructor(private http: HttpClient) { }

  obtenerUnidades(): Observable<Unidad[]> {
    const unidades = [
      {idUnidad: 1, nombre: "Unidad"},
      {idUnidad: 2, nombre: "Caja"},
      {idUnidad: 3, nombre: "Metro"},
      {idUnidad: 4, nombre: "Kg"}
    ]

    return of(unidades);
  }
}
