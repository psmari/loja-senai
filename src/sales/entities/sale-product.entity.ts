import { Product } from '../../products/entities/products.entity';
import {Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Sale } from './sale.entity';

@Entity()
export class SaleProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.saleProduct)
    product: Product;
    
    @ManyToOne(() => Sale, (sale) => sale.items)
    sale: Sale;

    @Column('decimal', { precision: 10, scale: 2})
    unitValue: number;

    @Column('int')
    quantity: number;
}