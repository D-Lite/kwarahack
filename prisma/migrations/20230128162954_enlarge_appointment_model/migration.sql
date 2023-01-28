/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `patientId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `workforceId` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `patient_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `selected_date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workforce_id` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_workforceId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
DROP COLUMN "patientId",
DROP COLUMN "workforceId",
ADD COLUMN     "confirm" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "patient_id" TEXT NOT NULL,
ADD COLUMN     "selected_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "workforce_id" TEXT NOT NULL,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("patient_id", "workforce_id");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("compound_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_workforce_id_fkey" FOREIGN KEY ("workforce_id") REFERENCES "workforces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
