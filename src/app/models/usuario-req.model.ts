export interface UsuarioRequest {
    dni: string;
    username: string;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string | null;
    roles: string[];
    fechaEliminacion: string | null;
}