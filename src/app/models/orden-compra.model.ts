import { Almacen } from "./almacen.model";
import { MetodoPago } from "./metodo-pago.model";
import { Proveedor } from "./proveedor.model";
import { TipoEntrega } from "./tipo-entrega.model";
import { Usuario } from "./usuario.model";

export interface OrdenCompra {
    idOrdenCompra: number;
    detalles: DetalleCompra[];
    proveedor: Proveedor;
    fechaEmision: string;
    fechaEsperada: string;
    subtotal: number;
    precioEnvio: number;
    otrosPagos: number;
    igv: number;
    total: number;
    destino: Almacen;
    estadoCompra: EstadoCompra;
    metodoPago: MetodoPago;
    tipoEntrega: TipoEntrega;
    usuarioSolicitante: Usuario;
    usuarioAutorizacion: Usuario;
}

export interface DetalleCompra {
    idDetalle: number;
    idProducto: number;
    producto: string;
    unidad: string;
    cantidad: number;
    precioUnitario: number;
    subtotal: number;
}

export interface EstadoCompra {
    idEstadoCompra: number;
    estado: string;
}