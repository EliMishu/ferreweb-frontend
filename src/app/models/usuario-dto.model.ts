export interface UsuarioDTO {
    id: number;
    dni: string;
    username: string;
    nombre: string;
    apellidoPat: string;
    apellidoMat: string;
    roles: string[];
    rutaImagen: string;
}