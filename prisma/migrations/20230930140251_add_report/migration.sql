/*
  Warnings:

  - You are about to drop the `Companie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_companieId_fkey";

-- DropForeignKey
ALTER TABLE "Schedules" DROP CONSTRAINT "Schedules_companieId_fkey";

-- DropForeignKey
ALTER TABLE "Services" DROP CONSTRAINT "Services_companieId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_companieId_fkey";

-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "confirmationCode" TEXT;

-- DropTable
DROP TABLE "Companie";

-- CreateTable
CREATE TABLE "Reports" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "status" TEXT DEFAULT 'analysing',
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "type" TEXT,
    "shareCode" TEXT,
    "address" TEXT,
    "amountAtTime" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_shareCode_key" ON "Company"("shareCode");

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedules" ADD CONSTRAINT "Schedules_companieId_fkey" FOREIGN KEY ("companieId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
