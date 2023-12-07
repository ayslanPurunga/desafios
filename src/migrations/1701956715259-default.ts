import { MigrationInterface, QueryRunner } from "typeorm";

export class default1701956715259 implements MigrationInterface {
    name = 'default1701956715259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "userDocument" character varying NOT NULL, "creditCardToken" character varying NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
