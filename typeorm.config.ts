import { Product } from './src/products/products.entity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'curso',
  entities: [Product],
  migrations: ['dist/migrations/*.js'],
});
