import { Maceta } from './maceta';

export interface Muro{
    comuna: string;
    direccion: string;
    habilitado: boolean;
    id_muro: number;
    macetas: Array<Maceta>;
}