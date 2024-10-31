import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  //private apiUrl = 'http://129.151.114.22:8080/api/data';

  constructor(private http: HttpClient) { }

  //getProductos(): Observable<Producto[]> {
  //  return this.http.get<Producto[]>(this.apiUrl);
  //}
}
