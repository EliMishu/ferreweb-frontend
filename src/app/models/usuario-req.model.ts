export interface UsuarioRequest {
    id: number;
    dni: string;
    username: string;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string | null;
    roles: string[];
    rutaImagen: string | null;
    fechaEliminacion: string | null;
}