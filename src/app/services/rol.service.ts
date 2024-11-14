import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.model';
import { RolDTO } from '../models/rol-dto.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = environment.apiUrl + "/roles";

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }

  obtenerRolporId(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/id/${id}`);
  }

  obtenerRolPorTipo(tipo: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/tipo/${tipo}`);
  }

  crearRol(request: RolDTO, imagen: File): Observable<Rol> {
    const formData: FormData = new FormData();
    formData.append('request', new Blob([JSON.stringify(request)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen, imagen.name);
    }
    return this.http.post<Rol>(this.apiUrl, formData);
  }

  actualizarRol(id: number, request: RolDTO, imagen: File): Observable<Rol> {
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
}
