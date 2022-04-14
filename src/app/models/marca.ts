export interface TodoListResponse {
    content: Marca[];
    totalElements: number;
}

export class Marca {
    id?: any;
    nome?: string;
}