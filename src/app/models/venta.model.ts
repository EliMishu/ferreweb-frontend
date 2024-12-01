export interface Venta {
  idVenta: number;
  estado: EstadoVenta;
  fecha: string;
  total: number;
}

export interface EstadoVenta {
    idEstadoVenta: number;
    estado: string;
}
