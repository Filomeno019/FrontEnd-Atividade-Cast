import { Marca } from './marca';
import { Modelo } from 'src/app/models/modelo';

export interface TodoListResponse {
    content: Veiculo[];
    totalElements: number;
}

export class Veiculo {
    id?: any;
    valorDe?: any;
    valorAte?: any;
    valor?: number;
    modelo?: Modelo = new Modelo;
    marca?: Marca = new Marca;
}