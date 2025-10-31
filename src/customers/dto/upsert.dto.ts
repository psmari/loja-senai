import { IsEmail, IsNotEmpty } from "class-validator";

export class UpsertDTO {
    @IsNotEmpty()
    nome: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    idade: number;
}