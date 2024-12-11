export interface VentaPresencialRequest {
    dniCliente: string;
    idAlmacen: number;
    idMetodoPago: number;
    detalles: DetalleVentaRequest[];
}

export interface DetalleVentaRequest {
    idProducto: number;
    idUnidad: number;
    cantidad: number;
}