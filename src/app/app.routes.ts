import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';
import { CategoriaDetailComponent } from './components/categoria-detail/categoria-detail.component';
import { CategoriaEditComponent } from './components/categoria-edit/categoria-edit.component';
import { CategoriaCreateComponent } from './components/categoria-create/categoria-create.component';
import { AlmacenListComponent } from './components/almacen-list/almacen-list.component';
import { AlmacenDetailComponent } from './components/almacen-detail/almacen-detail.component';
import { AlmacenEditComponent } from './components/almacen-edit/almacen-edit.component';
import { AlmacenCreateComponent } from './components/almacen-create/almacen-create.component';
import { ProductoListComponent } from './components/producto-list/producto-list.component';
import { ProductoDetailComponent } from './components/producto-detail/producto-detail.component';
import { ProductoEditComponent } from './components/producto-edit/producto-edit.component';
import { ProductoCreateComponent } from './components/producto-create/producto-create.component';
import { ModuloProductosComponent } from './components/modulo-productos/modulo-productos.component';
import { authenticatedGuard } from './guards/authenticated.guard';
import { authGuard } from './guards/auth.guard';
import { RolListComponent } from './components/rol-list/rol-list.component';
import { RolEditComponent } from './components/rol-edit/rol-edit.component';
import { ModuloGestionComponent } from './components/modulo-usuarios/modulo-usuarios.component';
import { RolCreateComponent } from './components/rol-create/rol-create.component';
import { RolDetailComponent } from './components/rol-detail/rol-detail.component';
import { RolSelectionComponent } from './components/rol-selection/rol-selection.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { adminGuard } from './guards/admin.guard';
import { routeCaseInsensitiveGuard } from './guards/route-case-insensitive.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    // Login routes
    {path: 'login', loadComponent: () => LoginComponent, canActivate:[authenticatedGuard]},
    {path: 'register', loadComponent: () => RegisterComponent, canActivate:[authenticatedGuard]},
    {path: 'rol/selection', loadComponent: () => RolSelectionComponent, canActivate:[authGuard]},
    {path: '', loadComponent: () => HomeComponent, canActivate:[]},
    {path: 'admin', loadComponent: () => AdminHomeComponent, canActivate:[authGuard]},

    // Module Gestion routes
    {path: 'modulo/gestion', loadComponent: () => ModuloGestionComponent, canActivate:[adminGuard]},
    {path: 'roles', loadComponent: () => RolListComponent, canActivate:[adminGuard, routeCaseInsensitiveGuard]},
    {path: 'rol/:idRol', loadComponent: () => RolDetailComponent, canActivate:[adminGuard]},
    {path: 'rol/edit/:idRol', loadComponent: () => RolEditComponent, canActivate:[adminGuard]},
    {path: 'roles/new', loadComponent: () => RolCreateComponent, canActivate:[adminGuard]},
    {path: 'usuarios', loadComponent: () => UsuarioListComponent, canActivate:[adminGuard]},
    

    // Module Productos routes
    {path: 'modulo/productos', loadComponent: () => ModuloProductosComponent, canActivate:[adminGuard]},
    {path: 'categorias', loadComponent: () => CategoriaListComponent, canActivate:[adminGuard]},
    {path: 'categoria/:idCategoria', loadComponent: () => CategoriaDetailComponent, canActivate:[adminGuard]},
    {path: 'categoria/edit/:idCategoria', loadComponent: () => CategoriaEditComponent, canActivate:[adminGuard]},
    {path: 'categorias/new', loadComponent: () => CategoriaCreateComponent, canActivate:[adminGuard]},
    {path: 'almacenes', loadComponent: () => AlmacenListComponent, canActivate:[adminGuard]},
    {path: 'almacen/:idAlmacen', loadComponent: () => AlmacenDetailComponent, canActivate:[adminGuard]},
    {path: 'almacen/edit/:idAlmacen', loadComponent: () => AlmacenEditComponent, canActivate:[adminGuard]},
    {path: 'almacenes/new', loadComponent: () => AlmacenCreateComponent, canActivate:[adminGuard]},
    {path: 'productos', loadComponent: () => ProductoListComponent, canActivate:[adminGuard]},
    {path: 'producto/:idProducto', loadComponent: () => ProductoDetailComponent, canActivate:[adminGuard]},
    {path: 'producto/edit/:idProducto', loadComponent: () => ProductoEditComponent, canActivate:[adminGuard]},
    {path: 'productos/new', loadComponent: () => ProductoCreateComponent, canActivate:[adminGuard]},
    
    // Error route
    {path: '**', loadComponent: () => NotFoundComponent, canActivate:[routeCaseInsensitiveGuard]},
];
