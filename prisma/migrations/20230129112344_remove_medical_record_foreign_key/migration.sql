/*
  Warnings:

  - You are about to drop the column `workforce_id` on the `medicalrecords` table. All the data in the column will be lost.
  - Added the required column `specialty` to the `workforces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "medicalrecords" DROP CONSTRAINT "medicalrecords_workforce_id_fkey";

-- AlterTable
ALTER TABLE "medicalrecords" DROP COLUMN "workforce_id";

-- AlterTable
ALTER TABLE "workforces" ADD COLUMN     "specialty" TEXT NOT NULL;
