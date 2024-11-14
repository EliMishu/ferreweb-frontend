export interface UsuarioDTO {
    id: number;
    dni: string;
    username: string;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    direccion: string;
    roles: string[];
    rutaImagen: string;
}