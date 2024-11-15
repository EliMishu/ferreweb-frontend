import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';
import { UsuarioDTO } from '../models/usuario-dto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private LOGIN_URL = environment.apiUrl + "/auth/login";
  private REGISTER_URL = environment.apiUrl + "/auth/register";
  private tokenKey = 'authToken';
  
  constructor(private http: HttpClient, private router: Router) { }

  login(user: string, contrasena: string): Observable<any> {
    return this.http.post<any>(this.LOGIN_URL, {user, contrasena}).pipe(
      tap (response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    )
  }

  register(user:string, contrasena: string, dni: string, nombre: string,
    apellidoPaterno: string, apellidoMaterno: string) : Observable<any> {
      return this.http.post<any>(this.REGISTER_URL, 
        {user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno}).pipe(
          tap (response => {
            if (response.token) {
              this.setToken(response.token);
            }
            catchError ((err) => throwError(() => new Error(err)))
          })
        )
  }
  
  private setToken(token: string): void {
    if (typeof window !== 'undefined')
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  } 

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const decode = jwtDecode(token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiracion = payload.exp * 1000;
    return Date.now() < expiracion;
  }

  logout(): void {
    sessionStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }
}
