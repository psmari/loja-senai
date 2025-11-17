import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumns1763415122094 implements MigrationInterface {
    name = 'AddColumns1763415122094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD \`unitValue\` decimal(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sale_product\` ADD \`quantity\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`sale_product\` DROP COLUMN \`unitValue\``);
    }

}
