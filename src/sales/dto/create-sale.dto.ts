import { IsNumber, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateSaleProductDto } from './create-sale-product.dto';

export class CreateSaleDto {
  @ApiProperty({
    example: 12,
    description: 'ID do cliente que está realizando a compra',
  })
  @IsNumber()
  customerId: number;

  @ApiProperty({
    example: 5,
    description: 'ID do funcionário responsável pelo atendimento',
  })
  @IsNumber()
  employeeId: number;

  @ApiProperty({
    example: [
      {
        productId: 1,
        unitValue: 49.9,
        quantity: 2,
      },
      {
        productId: 3,
        unitValue: 19.9,
        quantity: 1,
      },
    ],
    description: 'Itens da venda, contendo ID do produto, valor unitário e quantidade',
    type: [CreateSaleProductDto],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateSaleProductDto)
  @IsArray()
  items: CreateSaleProductDto[];
}
