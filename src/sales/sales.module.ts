import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/products.entity';
import { SaleProduct } from './entities/sale-product.entity';
import { Sale } from './entities/sale.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Product, SaleProduct, Sale, Customer, Employee
    ])
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
