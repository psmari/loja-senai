import { IsNotEmpty } from "class-validator";

export class UpsertDTO {
    @IsNotEmpty()
    nome: string;
    
    @IsNotEmpty()
    idade: number;
}