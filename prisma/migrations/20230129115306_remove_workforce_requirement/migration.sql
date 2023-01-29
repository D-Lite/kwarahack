/*
  Warnings:

  - You are about to drop the column `workforce_id` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_workforce_id_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "workforce_id";
