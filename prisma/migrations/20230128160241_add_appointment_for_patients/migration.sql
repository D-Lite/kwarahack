-- CreateTable
CREATE TABLE "Appointment" (
    "patientId" TEXT NOT NULL,
    "workforceId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("patientId","workforceId")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patients"("compound_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_workforceId_fkey" FOREIGN KEY ("workforceId") REFERENCES "workforces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
