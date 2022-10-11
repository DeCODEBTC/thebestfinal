import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665247511427 implements MigrationInterface {
    name = 'default1665247511427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "people" ("id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "people"`);
    }

}
