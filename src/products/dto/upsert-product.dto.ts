import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpsertProductDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    price: number;
}