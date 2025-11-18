import { IsString, IsNotEmpty, IsNumber, IsPositive, IsInt, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpsertProductDTO {
  @ApiProperty({
    example: 'Camiseta Preta',
    description: 'Nome do produto',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Camiseta 100% algodão, tamanho único',
    description: 'Descrição detalhada do produto',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: 49.90,
    description: 'Preço do produto com até 2 casas decimais',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({
    example: 'https://meusite.com/imagens/camiseta_preta.png',
    description: 'URL da imagem do produto',
  })
  @IsString()
  @IsUrl()
  image_url: string;

  @ApiProperty({
    example: 150,
    description: 'Quantidade em estoque',
  })
  @IsInt()
  @IsPositive()
  stock: number;
}
