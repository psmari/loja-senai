import { DataSource } from 'typeorm';
import { Sale } from './src/sales/entities/sale.entity';
import { Customer } from './src/customers/entities/customer.entity';
import { Product } from './src/products/entities/products.entity';
import { SaleProduct } from './src/sales/entities/sale-product.entity';
import { Employee } from './src/employees/entities/employee.entity';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'loja_senai',
  entities: [Product, Customer, Sale, SaleProduct, Employee],
  migrations: ['dist/migrations/*.js'],
});
