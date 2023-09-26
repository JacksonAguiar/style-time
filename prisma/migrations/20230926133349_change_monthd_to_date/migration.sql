/*
  Warnings:

  - You are about to drop the column `monthDay` on the `Appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "monthDay",
ADD COLUMN     "date" TEXT DEFAULT '2023-09-02';
