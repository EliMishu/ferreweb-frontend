
export interface ProductoDTO {
  categoria: string;
  unidadPorDefecto: string;
  unidadesPermitidas: UnidadPermitidaDTO[];
  almacenes: AlmacenProductoDTO[];
  nombre: string;
  descripcion: string;
}

export interface UnidadPermitidaDTO {
  nombreUnidad: string;
  precioPorUnidad: number;
}

export interface AlmacenProductoDTO {
  nombreAlmacen: string;
  cantidadProductos: number;
}