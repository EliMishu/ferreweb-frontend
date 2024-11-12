
export interface ProductoRequest {
  categoria: string;
  unidadPorDefecto: string;
  unidadesPermitidas: UnidadPermitidaRequest[];
  almacenes: AlmacenProductoRequest[];
  nombre: string;
  descripcion: string;
}

export interface UnidadPermitidaRequest {
  nombreUnidad: string;
  precioPorUnidad: number;
}

export interface AlmacenProductoRequest {
  nombreAlmacen: string;
  cantidadProductos: number;
}