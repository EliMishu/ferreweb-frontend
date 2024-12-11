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

  obtenerProductosBajoStock(): Observable<Producto[]> {
    return this.obtenerProductos().pipe(
      map((productos) => {
        return productos.filter((producto) => {
          return producto.stock <= 10;
        })
      })
    );
  }

  filtrarProductos(searchTerm: string, categoria: string, unidad: string, estado: string): Observable<Producto[]> {
    let productos = this.obtenerProductos();

    if (estado.trim() !== '') {
      if (estado === 'stockBajo') {
        productos = productos.pipe(
          map((productos) => {
            return productos.filter((producto) => {
              return producto.stock <= 10;
            });
          })
        );
      }
    }

    if (categoria.trim() !== '') {
      productos = productos.pipe(
        map((productos) => {
          return productos.filter((producto) => {
            return producto.categoria.nombre === categoria.trim();
          })
        })
      );
    }

    if (unidad.trim() !== '') {
      productos = productos.pipe(
        map((productos) => {
          return productos.filter((producto) => {
            return producto.unidadPorDefecto.nombre === unidad.trim();
          })
        })
      );
    }

    if (searchTerm.trim() !== '') {
      let searchTerms = searchTerm.split(" ");

      searchTerms.forEach(term => {
        productos = productos.pipe(
          map((productos) => {
            return productos.filter((producto) => {
              return (producto.idProducto.toString().includes(term.toLowerCase()) ||
                      producto.nombre.toLowerCase().includes(term.toLowerCase()));
            });
          })
        )
      })
    } 

    return productos;
  }

  buscarProductosPorNombre(query: string) {
    let productos = this.obtenerProductos();

    if (query.trim() !== '') {
      productos = productos.pipe(
        map((productos) => {
          return productos.filter((producto) => {
            return (producto.nombre.toLowerCase().includes(query.toLowerCase()));
          })
        })
      )
    }

    return productos;
  }

  obtenerProducto(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  contarProductos(): Observable<number> {
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

  contarProductosBajoStock(): Observable<number> {
    return this.obtenerProductosBajoStock().pipe(
      map((productos) => {
        return productos.length;
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
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}