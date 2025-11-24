import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDatabase1764003989837 implements MigrationInterface {
    name = 'InitialDatabase1764003989837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "price" numeric(10,2) NOT NULL, "image_url" character varying NOT NULL, "stock" integer NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale_product" ("id" SERIAL NOT NULL, "unitValue" numeric(10,2) NOT NULL, "quantity" integer NOT NULL, "productId" integer, "saleId" integer, CONSTRAINT "PK_4c90923fcc89bf8eeecd181fffc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(10) NOT NULL, CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(100) NOT NULL, "phone" character varying(10) NOT NULL, "salary" numeric(10,2) NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" SERIAL NOT NULL, "total" numeric(10,2) NOT NULL, "customerId" integer, "employeeId" integer, CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "sale_product" ADD CONSTRAINT "FK_650636cdcaeada7ede8e412b83c" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale_product" ADD CONSTRAINT "FK_a50b661dd4ed9ce26b27d17ea2a" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_a742b91c1b99a4269c102d47541" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_d223bdcf5ca2969be663637c5e2" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_d223bdcf5ca2969be663637c5e2"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_a742b91c1b99a4269c102d47541"`);
        await queryRunner.query(`ALTER TABLE "sale_product" DROP CONSTRAINT "FK_a50b661dd4ed9ce26b27d17ea2a"`);
        await queryRunner.query(`ALTER TABLE "sale_product" DROP CONSTRAINT "FK_650636cdcaeada7ede8e412b83c"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "sale_product"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
