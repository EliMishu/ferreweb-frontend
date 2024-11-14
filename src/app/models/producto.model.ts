import { Almacen } from "./almacen.model";
import { Categoria } from "./categoria.models";
import { Unidad } from "./unidad.model";

export interface Producto {
    idProducto: number;
    categoria: Categoria;
    unidadPorDefecto: Unidad;
    unidadesPermitidas: UnidadPermitida[];
    almacenes: AlmacenProducto[];
    nombre: string;
    descripcion: string;
    stock: number;
    rutaImagen?: string;
}

export interface UnidadPermitida {
    unidad: Unidad;
    precio: number;
}

export interface AlmacenProducto {
    almacen: Almacen;
    cantidad: number;
}