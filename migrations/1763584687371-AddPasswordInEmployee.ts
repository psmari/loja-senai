import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordInEmployee1763584687371 implements MigrationInterface {
    name = 'AddPasswordInEmployee1763584687371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`employee\` DROP COLUMN \`password\``);
    }

}
