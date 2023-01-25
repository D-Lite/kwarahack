-- CreateEnum
CREATE TYPE "WorkforceRole" AS ENUM ('DOCTOR', 'PHAMARCIST', 'NURSE', 'MD', 'MH');

-- CreateEnum
CREATE TYPE "WorkforceIDType" AS ENUM ('NMA', 'NURSINGCOUNCIL', 'NPA');

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "allergies" TEXT,
    "known_disease_history" TEXT,
    "blood_group" TEXT,
    "genotype" TEXT,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workforces" (
    "id" TEXT NOT NULL,
    "role" "WorkforceRole" NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "id_card_type" "WorkforceIDType",
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "id_number" TEXT,
    "is_available" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "workforces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prescriptions" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER,
    "prescriptions" TEXT[],
    "physician" TEXT NOT NULL,
    "pharmacist" TEXT,
    "date_of_prescription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_of_collection" TIMESTAMP(3),

    CONSTRAINT "prescriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_phone_number_key" ON "patients"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "patients_email_key" ON "patients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workforces_email_key" ON "workforces"("email");

-- CreateIndex
CREATE UNIQUE INDEX "workforces_username_key" ON "workforces"("username");
