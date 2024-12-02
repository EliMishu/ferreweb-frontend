import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { map, Observable, tap } from 'rxjs';
import { Rol } from '../models/rol.model';
import { RolRequest } from '../models/rol-req.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = environment.apiUrl + "/roles";
  private readonly rolKey = "selectedRol";

  constructor(
    private http: HttpClient
  ) { }

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  filtrarRoles(searchTerm: string): Observable<Rol[]> {
    let roles = this.obtenerRoles();

    if (searchTerm === '') {
      return roles;
    } else {
      return roles.pipe(
        map(roles => {
          return roles.filter(rol => {
            return (rol.idRol.toString().includes(searchTerm.toLowerCase()) || 
            rol.tipo.toLowerCase().includes(searchTerm.toLowerCase()))
          })
        })
      )
    }
  }

  contarRoles(): Observable<number> {
    return this.obtenerRoles().pipe(
      map((roles) => {
        return roles.length;
      })
    )
  }

  obtenerRolporId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/id/${id}`);
  }

  obtenerRolPorTipo(tipo: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/tipo/${tipo}`);
  }

  crearRol(request: RolRequest, imagen: File): Observable<Rol> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.post<Rol>(this.apiUrl, formData);
  }

  actualizarRol(id: number, request: RolRequest, imagen: File): Observable<Rol> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json'}));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.put<Rol>(`${this.apiUrl}/${id}`, formData);
  }

  eliminarRol(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerRolSeleccionado(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.rolKey);
    } else {
      return null;
    }
  }

  establecerRolSeleccionado(rol: string): void {
    if (typeof window !== 'undefined')
    sessionStorage.setItem(this.rolKey, rol);
  }

  limpiarRolSeleccionado(): void {
    if (typeof window !== 'undefined')
    sessionStorage.removeItem(this.rolKey);
  }
}
