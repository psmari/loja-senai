import { IsNotEmpty, IsString } from "class-validator";

export class UpsertProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
}