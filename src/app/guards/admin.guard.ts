import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return usuarioService.obtenerUsuarioActual().pipe(
      map(usuario => {
        const existsAdmin = usuario.roles.some(rol => rol.tipo === 'ADMIN');
        
        if (existsAdmin) {
          return true;
        } else {
          router.navigate(['/']);
          return false;
        }
      }),
      catchError((error) => {
        router.navigate(['/']);
        return of(false);
      })
    );
  }
  
  return of(false);
};
