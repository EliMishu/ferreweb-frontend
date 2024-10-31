import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriaComponent } from './components/categoria/categoria.component';

export const routes: Routes = [
    {path: 'login', loadComponent: () => LoginComponent},
    {path: 'register', loadComponent: () => RegisterComponent},
    {path: 'categorias', loadComponent: () => CategoriaComponent}
];
