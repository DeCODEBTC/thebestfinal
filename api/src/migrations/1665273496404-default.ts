import { MigrationInterface, QueryRunner } from "typeorm";

export class default1665273496404 implements MigrationInterface {
    name = 'default1665273496404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "people" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "people" ADD CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317" UNIQUE ("name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "people" DROP CONSTRAINT "UQ_e7ec00b080e693706a6eaa6d317"`);
        await queryRunner.query(`ALTER TABLE "people" ADD "updated_at" TIMESTAMP(3) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "people" ADD "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
