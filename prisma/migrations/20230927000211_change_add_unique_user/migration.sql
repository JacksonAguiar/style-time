/*
  Warnings:

  - A unique constraint covering the columns `[companieId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Appointments" ALTER COLUMN "date" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_companieId_key" ON "User"("companieId");
