/*
  Warnings:

  - A unique constraint covering the columns `[shareCode]` on the table `Companie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Companie" ADD COLUMN     "address" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Companie_shareCode_key" ON "Companie"("shareCode");
