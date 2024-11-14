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

export const routes: Routes = [
    // Login routes
    {path: 'login', loadComponent: () => LoginComponent, canActivate:[authenticatedGuard]},
    {path: 'register', loadComponent: () => RegisterComponent, canActivate:[authenticatedGuard]},

    // Module Gestion routes
    {path: 'roles', loadComponent: () => RolListComponent, canActivate:[authGuard]},

    
    {path: 'rol/edit/:idRol', loadComponent: () => RolEditComponent, canActivate:[authGuard]},

    // Module Productos routes
    {path: 'modProductos', loadComponent: () => ModuloProductosComponent, canActivate:[authGuard]},
    {path: 'categorias', loadComponent: () => CategoriaListComponent, canActivate:[authGuard]},
    {path: 'categoria/:idCategoria', loadComponent: () => CategoriaDetailComponent, canActivate:[authGuard]},
    {path: 'categoria/edit/:idCategoria', loadComponent: () => CategoriaEditComponent, canActivate:[authGuard]},
    {path: 'categorias/new', loadComponent: () => CategoriaCreateComponent, canActivate:[authGuard]},
    {path: 'almacenes', loadComponent: () => AlmacenListComponent, canActivate:[authGuard]},
    {path: 'almacen/:idAlmacen', loadComponent: () => AlmacenDetailComponent, canActivate:[authGuard]},
    {path: 'almacen/edit/:idAlmacen', loadComponent: () => AlmacenEditComponent, canActivate:[authGuard]},
    {path: 'almacenes/new', loadComponent: () => AlmacenCreateComponent, canActivate:[authGuard]},
    {path: 'productos', loadComponent: () => ProductoListComponent, canActivate:[authGuard]},
    {path: 'producto/:idProducto', loadComponent: () => ProductoDetailComponent, canActivate:[authGuard]},
    {path: 'producto/edit/:idProducto', loadComponent: () => ProductoEditComponent, canActivate:[authGuard]},
    {path: 'productos/new', loadComponent: () => ProductoCreateComponent, canActivate:[authGuard]}
];
