import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
} 