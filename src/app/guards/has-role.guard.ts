import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

export function hasAnyRole(rolesPermitidos: string[]): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const usuarioService = inject(UsuarioService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
      router.navigate(['/']);
      return of(false);
    }

    return usuarioService.obtenerUsuarioActual().pipe(
      map((usuario) => {
        const hasRole = rolesPermitidos.some((rol) =>
          usuario.roles.some((userRol) => userRol.tipo.toUpperCase() === rol.toUpperCase())
        );

        if (!hasRole) {
          alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
          router.navigate(['/']);
        }

        return hasRole;
      }),
      catchError(() => {
        alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
        router.navigate(['/']);
        return of(false);
      })
    );
  };
}

export function hasRole(rol: string): CanActivateFn {
  return () => {
    const authService = inject(AuthService);
    const usuarioService = inject(UsuarioService);
    const alertService = inject(AlertService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
      router.navigate(['/']);
      return of(false);
    }

    return usuarioService.obtenerUsuarioActual().pipe(
      map((usuario) => {
        const hasRole = usuario.roles.some((userRol) => rol.toUpperCase() === userRol.tipo.toUpperCase());

        if (!hasRole) {
          alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
          router.navigate(['/']);
        }

        return hasRole;
      }),
      catchError(() => {
        alertService.showWarningWithTitle('UNAUTHORIZED', 'Acceso Restringido.');
        router.navigate(['/']);
        return of(false);
      })
    );
  };
}
