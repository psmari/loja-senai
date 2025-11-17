import { Sale } from "../../sales/entities/sale.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Employee {
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

    @Column("decimal", { precision: 10, scale: 2 })
    salary: number;

    @OneToMany(() => Sale, (sale) => sale.employee)
    sales: Sale[]
}
