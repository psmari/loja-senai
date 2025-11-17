import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SaleProduct } from "./sale-product.entity";
import { Customer } from "../../customers/entities/customer.entity";
import { Employee } from "../../employees/entities/employee.entity";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, (customer) => customer.sales)
    customer: Customer;

    @ManyToOne(() => Employee, (employee) => employee.sales)
    employee: Employee;

    @OneToMany(() => SaleProduct, (saleProduct) => saleProduct.sale)
    items: SaleProduct[];

    @Column('decimal', {precision: 10, scale:2})
    total: number;
}
