-- CreateTable
CREATE TABLE "HealthcareProvider" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "HealthcareProvider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthcareProvider_stateId_key" ON "HealthcareProvider"("stateId");
