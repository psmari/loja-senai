import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleProductDto {
  @ApiProperty({
    example: 1,
    description: 'ID do produto vendido',
  })
  @IsNumber()
  productId: number;

  @ApiProperty({
    example: 49.9,
    description: 'Valor unitário do produto no momento da venda (máx. 2 casas decimais)',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  unitValue: number;

  @ApiProperty({
    example: 2,
    description: 'Quantidade vendida do produto',
  })
  @IsNumber()
  quantity: number;
}
