import { Rol } from "./rol.model";

export interface Usuario {
    id: number;
    dni: string;
    username: string;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string | null;
    roles: Rol[];
    rutaImagen: string | null;
    fechaEliminacion: string | null;
}