import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { UsuarioRequest } from '../models/usuario-req.model';

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

  filtrarUsuarios(searchTerm: string, rol: string, estado: string): Observable<Usuario[]> {
    let usuarios = this.obtenerUsuarios();

    if (rol.trim() !== "") {
      if (rol === "empleado") {
        usuarios = usuarios.pipe(
          map((usuarios) => {
            const empleados = usuarios.filter((usuario) => {
              return usuario.roles.length > 1;
            })
    
            return empleados
          })
        )
      } else {
        usuarios = usuarios.pipe(
          map(usuarios => {
            return usuarios.filter(usuario => {
              return usuario.roles.some(userRol => userRol.tipo.toLowerCase() === rol.toLowerCase())
            })
          })
        )
      }
    }

    if (estado.trim() !== "") {
      if (estado === "activo") {
        usuarios = usuarios.pipe(
          map(usuarios => {
            return usuarios.filter(usuario => {
              return usuario.fechaEliminacion === null || usuario.fechaEliminacion === ""
            })
          })
        )
      } else {
        usuarios = usuarios.pipe(
          map(usuarios => {
            return usuarios.filter(usuario => {
              return usuario.fechaEliminacion !== null && usuario.fechaEliminacion !== ""
            })
          })
        )
      }
    }

    if (searchTerm.trim() !== "") {
      let searchTerms = searchTerm.split(" ");

      searchTerms.forEach(term => {
        usuarios = usuarios.pipe(
          map(usuarios => {
            return usuarios.filter(usuario => {
              return (
                usuario.username.toLowerCase().includes(term.toLowerCase()) ||
                usuario.nombre.toLowerCase().includes(term.toLowerCase()) ||
                usuario.dni.toLowerCase().includes(term.toLowerCase()) ||
                usuario.apellidoPat.toLowerCase().includes(term.toLowerCase()) ||
                usuario.apellidoMat.toLowerCase().includes(term.toLowerCase())
              )
            })
          })
        )
      })
    }

    return usuarios;
  }

  obtenerEmpleados(): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        const empleados = usuarios.filter((usuario) => {
          return usuario.roles.length > 1;
        })

        return empleados
      })
    )
  }

  contarEmpleados(): Observable<number> {
    return this.obtenerEmpleados().pipe(
      map(empleados => empleados.length)
    )
  }

  obtenerUsuariosActivos(): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        const activos = usuarios.filter((usuario) => {
          return usuario.fechaEliminacion === null || usuario.fechaEliminacion === "";
        })

        return activos
      })
    )
  }

  contarUsuariosActivos(): Observable<number> {
    return this.obtenerUsuariosActivos().pipe(
      map(activos => activos.length)
    )
  }

  obtenerUsuariosInactivos(): Observable<Usuario[]> {
    return this.obtenerUsuarios().pipe(
      map((usuarios) => {
        console.log(usuarios)
        const inactivos = usuarios.filter((usuario) => {
          return usuario.fechaEliminacion !== null && usuario.fechaEliminacion !== "";
        })

        return inactivos
      })
    )
  }
  
  contarUsuariosInactivos(): Observable<number> {
    return this.obtenerUsuariosInactivos().pipe(
      map(inactivos => inactivos.length)
    )
  }
  
  obtenerUsuarioActual(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`);
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(request: UsuarioRequest, imagen: File): Observable<Usuario> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.post<Usuario>(this.apiUrl, formData);
  }

  actualizarUsuario(id: number, request: UsuarioRequest, imagen: File): Observable<Usuario> {
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
