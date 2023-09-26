/*
  Warnings:

  - You are about to drop the column `datetimes` on the `Appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "datetimes",
ADD COLUMN     "hours" TIMESTAMP(3)[];
