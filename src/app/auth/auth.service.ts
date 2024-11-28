import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + "/auth";
  private readonly tokenKey = "authToken";
  
  constructor(private http: HttpClient,
      private router: Router) { }

  login(user: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, {user, contrasena}).pipe(
      tap (response => {
        if (response.token) {
          console.log(response);
          this.establecerToken(response.token);
          this.redirect(response);
        }
      })
    )
  }

  register(user:string, contrasena: string, dni: string, nombre: string,
    apellidoPaterno: string, apellidoMaterno: string) : Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/register`, 
        {user, contrasena, dni, nombre, apellidoPaterno, apellidoMaterno}).pipe(
          tap (response => {
            if (response.token) {
              this.establecerToken(response.token);
              this.redirect(response);
            }
          })
        )
  }

  private redirect(response: any) {
    if (response.usuario.roles.length > 1) {
      this.router.navigate(['/rol/selection'])
      .then(() => window.location.reload());
    } else {
      this.router.navigate(['/'])
      .then(() => window.location.reload());
    }
  }
  
  private establecerToken(token: string): void {
    if (typeof window !== 'undefined')
    sessionStorage.setItem(this.tokenKey, token);
  }

  obtenerToken(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.tokenKey);
    } else {
      return null;
    }
  } 

  isAuthenticated(): boolean {
    const token = this.obtenerToken();

    if (!token) {
      return false;
    }

    const decode = jwtDecode(token);

    return decode.exp != null && Date.now() < decode.exp * 1000;
  }

  limpiarToken(): void {
    if (typeof window !== 'undefined')
    sessionStorage.removeItem(this.tokenKey);
  }

  logout(): void {
    this.limpiarToken();
    this.router.navigate(['/'])
    .then(() => window.location.reload());
  }
}
