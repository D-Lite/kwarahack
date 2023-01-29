/*
  Warnings:

  - The primary key for the `Appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Appointment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "medicalrecords" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "workforce_id" TEXT NOT NULL,
    "bodytemperature" TEXT,
    "pulse" TEXT,
    "respiratoryrate" TEXT,
    "bloodsugar" TEXT,
    "bodyfatpercent" TEXT,
    "cholestrol" TEXT,
    "hemoglobin" TEXT,
    "whitebloodcell" TEXT,
    "bmi" TEXT,
    "oxygenlevel" TEXT,
    "bloodpressure" TEXT,
    "weight" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "medicalrecords_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "medicalrecords" ADD CONSTRAINT "medicalrecords_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("compound_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicalrecords" ADD CONSTRAINT "medicalrecords_workforce_id_fkey" FOREIGN KEY ("workforce_id") REFERENCES "workforces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
