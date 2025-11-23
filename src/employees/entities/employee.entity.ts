import * as bcrypt from 'bcrypt';
import { Sale } from "../../sales/entities/sale.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password && !this.password.startsWith('$2b$')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        }
    }
}
