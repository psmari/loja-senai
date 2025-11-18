import { SaleProduct } from "../../sales/entities/sale-product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column('varchar')
    image_url: string;

    @Column('int')
    stock: number;

    @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.product)
    saleProduct: SaleProduct[];
}