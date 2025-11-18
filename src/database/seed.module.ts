// src/database/seed.module.ts
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "../customers/entities/customer.entity";
import { Sale } from "src/sales/entities/sale.entity";
import { Product } from "src/products/entities/products.entity";
import { SaleProduct } from "src/sales/entities/sale-product.entity";
import { Employee } from "src/employees/entities/employee.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // padrão
      username: 'root',
      password: '',
      database: 'loja_senai',
      autoLoadEntities: true,
      synchronize: false,  // importante! false em produção
      logging: true,
    }),
    TypeOrmModule.forFeature([Product, Customer, Sale, SaleProduct, Employee]),
  ],
})
export class SeedModule {}
