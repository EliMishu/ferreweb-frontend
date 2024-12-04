import { Almacen } from "./almacen.model";
import { Categoria } from "./categoria.model";
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
    idProducto: number;
    unidad: Unidad;
    precio: number;
    equivalencia: number;
}

export interface AlmacenProducto {
    idProducto: number;
    almacen: Almacen;
    cantidad: number;
}