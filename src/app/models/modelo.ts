import { Marca } from './marca';
export interface TodoListResponse {
    content: Modelo[];
    totalElements: number;
}

export class Modelo {
    id?: any;
    nome?: string;
    marca?: Marca;
}