import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  contarUsuariosPorRol(rolStr: string): Observable<number> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        const usuariosFiltrados = usuarios.filter((usuario) => {
          return usuario.roles.some(rol => rol.tipo.toLowerCase() === rolStr.toLowerCase());
        })

        return usuariosFiltrados.length;
      })
    );
  }

  contarEmpleados(): Observable<number> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        const empleados = usuarios.filter((usuario) => {
          return usuario.roles.length > 1;
        })

        return empleados.length
      })
    )
  }

  contarUsuariosActivos(): Observable<number> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        const activos = usuarios.filter((usuario) => {
          return usuario.fechaEliminacion === null || usuario.fechaEliminacion === "";
        })

        return activos.length
      })
    )
  }
  
  contarUsuariosInactivos(): Observable<number> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        console.log(usuarios)
        const inactivos = usuarios.filter((usuario) => {
          return usuario.fechaEliminacion !== null && usuario.fechaEliminacion !== "";
        })

        return inactivos.length
      })
    )
  }
  
  obtenerUsuarioActual(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(request: Usuario, imagen: File): Observable<Usuario> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.post<Usuario>(this.apiUrl, formData);
  }

  actualizarUsuario(id: number, request: Usuario, imagen: File): Observable<Usuario> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json'}));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
