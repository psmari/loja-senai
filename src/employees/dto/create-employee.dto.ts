import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEmail, Length, IsDecimal } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'O nome completo do usuário',
  })
  @IsString()
  @Length(1, 100)
  name: string = 'Mari';

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  @Length(10, 10)
  phone: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  salary: number;
}
