import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { ProductoRequest } from '../models/producto-req.model';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = environment.apiUrl + "/productos";

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  contarProductosActivos(): Observable<number> {
    return this.obtenerProductos().pipe(
      map((productos) => {
        return productos.length;
      })
    );
  }

  contarProductosPorCategoria(categoriaStr: string): Observable<number> {
    return this.obtenerProductos().pipe(
      map((productos) => {
        const productosFiltrados = productos.filter(producto => 
          producto.categoria.nombre === categoriaStr || !categoriaStr
        );
        
        return productosFiltrados.length;
      })
    );
  }

  crearProducto(request: ProductoRequest, imagen: File): Observable<Producto> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json'}));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.post<Producto>(this.apiUrl, formData);
  }

  actualizarProducto(id: number, request: ProductoRequest, imagen: File): Observable<Producto> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json'}));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }

    return this.http.put<Producto>(`${this.apiUrl}/${id}`, request);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}