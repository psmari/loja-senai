import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { EmployeesModule } from './employees/employees.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule, CustomersModule, EmployeesModule, SalesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
