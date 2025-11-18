import { IsString, IsEmail, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(11, 11)
  cpf: string;

  @IsEmail()
  @Length(1, 100)
  email: string;

  @IsString()
  @Length(10, 10)
  phone: string;
}
