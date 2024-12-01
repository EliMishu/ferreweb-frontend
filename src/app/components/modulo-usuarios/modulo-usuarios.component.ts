import { Component } from '@angular/core';
import { Params, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-modulo-gestion',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './modulo-usuarios.component.html',
  styleUrl: './modulo-usuarios.component.css'
})
export class ModuloGestionComponent {
  empleadosInfo = 0;
  usuariosActivosInfo = 0;
  usuariosInactivosInfo = 0;
  rolesInfo = 0;

  constructor (
    private router: Router,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {}

  ngOnInit(): void {
      this.cargarInfoDeEmpleados();
      this.cargarInfoDeUsuariosActivos();
      this.cargarInfoDeUsuariosInactivos();
      this.cargarInfoDeRoles();
  }

  cargarInfoDeEmpleados(): void {
    this.usuarioService.contarEmpleados().subscribe(
      (conteo) => {
        this.empleadosInfo = conteo;
      }
    );
  }

  cargarInfoDeUsuariosActivos(): void {
    this.usuarioService.contarUsuariosActivos().subscribe(
      (conteo) => {
        this.usuariosActivosInfo = conteo;
      }
    )
  }

  cargarInfoDeUsuariosInactivos(): void {
    this.usuarioService.contarUsuariosInactivos().subscribe(
      (conteo) => {
        this.usuariosInactivosInfo = conteo;
      }
    )
  }

  cargarInfoDeRoles(): void {
    this.rolService.contarRoles().subscribe(
      (conteo) => {
        this.rolesInfo = conteo;
      }
    )
  }

  redirigirConFiltros(ruta: string[], queryParams: Params): void {
    this.router.navigate(ruta, { queryParams });
  }
}
