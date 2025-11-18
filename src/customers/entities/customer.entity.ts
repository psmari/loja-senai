import { Sale } from "../../sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column("varchar", { length: 100 })
    name: string;

    @Column("varchar", { length: 11 })
    cpf: string;

    @Column("varchar", { length: 100 })
    email: string;

    @Column("varchar", { length: 10 })
    phone: string;

    @OneToMany(() => Sale, (sale) => sale.customer)
    sales: Sale[]
}
