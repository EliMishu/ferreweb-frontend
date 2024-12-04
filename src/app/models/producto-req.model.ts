
export interface ProductoRequest {
  categoria: string;
  unidadPorDefecto: string;
  unidadesPermitidas: UnidadPermitidaRequest[];
  almacenes: AlmacenProductoRequest[];
  nombre: string;
  descripcion: string;
}

export interface UnidadPermitidaRequest {
  idProducto?: number;
  nombreUnidad: string;
  precioPorUnidad: number;
  equivalencia: number;
}

export interface AlmacenProductoRequest {
  idProducto?: number;
  nombreAlmacen: string;
  cantidadProductos: number;
}