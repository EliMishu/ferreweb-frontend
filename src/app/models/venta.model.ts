import { Usuario } from "./usuario.model";

export interface Venta {
  idVenta: number;
  estado: string;
  fecha: string;
  total: number;
  subtotal: number;
  igv: number;
  responsable: Usuario;
  dniCliente: string;
  detalles: DetalleVenta[];
}

export interface DetalleVenta {
  idDetalle: number;
  idProducto: number;
  producto: string;
  unidad: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}