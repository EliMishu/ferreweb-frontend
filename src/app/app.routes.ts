import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriaListComponent } from './components/categoria-list/categoria-list.component';
import { CategoriaEditComponent } from './components/categoria-edit/categoria-edit.component';
import { CategoriaCreateComponent } from './components/categoria-create/categoria-create.component';
import { AlmacenListComponent } from './components/almacen-list/almacen-list.component';
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
import { RolSelectionComponent } from './components/rol-selection/rol-selection.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { HomeComponent } from './components/home/home.component';
import { UsuarioListComponent } from './components/usuario-list/usuario-list.component';
import { routeCaseInsensitiveGuard } from './guards/route-case-insensitive.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UsuarioEditComponent } from './components/usuario-edit/usuario-edit.component';
import { UnidadListComponent } from './components/unidad-list/unidad-list.component';
import { ModuloComprasComponent } from './components/modulo-compras/modulo-compras.component';
import { ProveedorListComponent } from './components/proveedor-list/proveedor-list.component';
import { ProveedorCreateComponent } from './components/proveedor-create/proveedor-create.component';
import { SolicitudCotizacionComponent } from './components/solicitud-cotizacion/solicitud-cotizacion.component';
import { UnidadCreateComponent } from './components/unidad-create/unidad-create.component';
import { ProveedorEditComponent } from './components/proveedor-edit/proveedor-edit.component';
import { OrdenCompraCreateComponent } from './components/orden-compra-create/orden-compra-create.component';
import { ComprasListComponent } from './components/compras-list/compras-list.component';
import { PagoCompraComponent } from './components/pago-compra/pago-compra.component';
import { hasAnyRole, hasRole } from './guards/has-role.guard';
import { VentaPresencialCreateComponent } from './components/venta-presencial-create/venta-presencial-create.component';
import { VentaPresencialListComponent } from './components/venta-presencial-list/venta-presencial-list.component';
import { ModuloVentasComponent } from './components/modulo-ventas/modulo-ventas.component';
import { VentaDetailComponent } from './components/venta-detail/venta-detail.component';

export const routes: Routes = [
    // Public routes
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadComponent: () => HomeComponent, canActivate:[]},
    {path: 'login', loadComponent: () => LoginComponent, canActivate:[authenticatedGuard]},
    {path: 'register', loadComponent: () => RegisterComponent, canActivate:[authenticatedGuard]},
    {path: 'rol/selection', loadComponent: () => RolSelectionComponent, canActivate:[authGuard]},

    // RESTRICTED ROUTES
    {path: 'admin', loadComponent: () => AdminHomeComponent, canActivate:[hasRole('ADMIN')]},

    // Module Gestion routes
    {path: 'modulo/gestion', loadComponent: () => ModuloGestionComponent, canActivate:[hasRole('ADMIN')]},
    {path: 'roles', loadComponent: () => RolListComponent, canActivate:[hasRole('ADMIN')]},
    {path: 'rol/edit/:idRol', loadComponent: () => RolEditComponent, canActivate:[hasRole('ADMIN')]},
    {path: 'usuarios', loadComponent: () => UsuarioListComponent, canActivate:[hasRole('ADMIN')]},
    {path: 'usuario/edit/:idUsuario', loadComponent: () => UsuarioEditComponent, canActivate:[hasRole('ADMIN')]},

    // Module Inventario routes
    {path: 'modulo/productos', loadComponent: () => ModuloProductosComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'categorias', loadComponent: () => CategoriaListComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'categoria/edit/:idCategoria', loadComponent: () => CategoriaEditComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'categorias/new', loadComponent: () => CategoriaCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'almacenes', loadComponent: () => AlmacenListComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'almacen/edit/:idAlmacen', loadComponent: () => AlmacenEditComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'almacenes/new', loadComponent: () => AlmacenCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'productos', loadComponent: () => ProductoListComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS', 'CAJERO', 'INVENTARIO'])]},
    {path: 'producto/:idProducto', loadComponent: () => ProductoDetailComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS', 'CAJERO'])]},
    {path: 'producto/edit/:idProducto', loadComponent: () => ProductoEditComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'productos/new', loadComponent: () => ProductoCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'unidades', loadComponent: () => UnidadListComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    {path: 'unidades/new', loadComponent: () => UnidadCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'INVENTARIO'])]},
    
    // Module Compras routes
    {path: 'compras', redirectTo: 'modulo/compras', pathMatch: 'full'},
    {path: 'modulo/compras', loadComponent: () => ModuloComprasComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'proveedores', loadComponent: () => ProveedorListComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'proveedores/new', loadComponent: () => ProveedorCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'proveedor/edit/:idProveedor', loadComponent: () => ProveedorEditComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'proveedores/cotizacion', loadComponent: () => SolicitudCotizacionComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'ordenes-compra', loadComponent: () => ComprasListComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'ordenes-compra/new', loadComponent: () => OrdenCompraCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    {path: 'ordenes-compra/pago/:idCompra', loadComponent: () => PagoCompraComponent, canActivate:[hasAnyRole(['ADMIN', 'COMPRAS'])]},
    
    // Module Ventas routes
    {path: 'modulo/ventas', loadComponent: () => ModuloVentasComponent, canActivate:[hasAnyRole(['ADMIN', 'CAJERO'])]},
    {path: 'ventas', loadComponent: () => VentaPresencialListComponent, canActivate:[hasAnyRole(['ADMIN', 'CAJERO'])]},
    {path: 'ventas/new', loadComponent: () => VentaPresencialCreateComponent, canActivate:[hasAnyRole(['ADMIN', 'CAJERO'])]},
    {path: 'ventas/:idVenta', loadComponent: () => VentaDetailComponent, canActivate:[hasAnyRole(['ADMIN', 'CAJERO'])]},
    
    // Error route
    {path: '**', loadComponent: () => NotFoundComponent, canActivate:[routeCaseInsensitiveGuard]},
];
