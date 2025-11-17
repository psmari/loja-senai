import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1763161774036 implements MigrationInterface {
    name = 'InitialDatabase1763161774036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`price\` decimal(10,2) NOT NULL, \`image_url\` varchar(255) NOT NULL, \`stock\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale_product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`productId\` int NULL, \`saleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customer\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(10) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`cpf\` varchar(11) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(10) NOT NULL, \`salary\` decimal(10,2) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sale\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total\` decimal(10,2) NOT NULL, \`customerId\` int NULL, \`employeeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD CONSTRAINT \`FK_650636cdcaeada7ede8e412b83c\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD CONSTRAINT \`FK_a50b661dd4ed9ce26b27d17ea2a\` FOREIGN KEY (\`saleId\`) REFERENCES \`sale\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_a742b91c1b99a4269c102d47541\` FOREIGN KEY (\`customerId\`) REFERENCES \`customer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sale\` ADD CONSTRAINT \`FK_d223bdcf5ca2969be663637c5e2\` FOREIGN KEY (\`employeeId\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_d223bdcf5ca2969be663637c5e2\``);
        await queryRunner.query(`ALTER TABLE \`sale\` DROP FOREIGN KEY \`FK_a742b91c1b99a4269c102d47541\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP FOREIGN KEY \`FK_a50b661dd4ed9ce26b27d17ea2a\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP FOREIGN KEY \`FK_650636cdcaeada7ede8e412b83c\``);
        await queryRunner.query(`DROP TABLE \`sale\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`customer\``);
        await queryRunner.query(`DROP TABLE \`sale_product\``);
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
