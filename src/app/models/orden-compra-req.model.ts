export interface OrdenCompraRequest {
    idProveedor: number;
    detalles: DetalleCompraRequest[];
    precioEnvio: number;
    otrosPagos: number;
    idAlmacenDestino: number;
    idMetodoPago: number;
    idTipoEntrega: number;
    fechaEsperada: string;
}

export interface DetalleCompraRequest {
    idProducto: number;
    idUnidad: number;
    precio: number;
    cantidad: number;
}