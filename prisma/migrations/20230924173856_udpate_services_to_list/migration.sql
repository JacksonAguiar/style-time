/*
  Warnings:

  - The `services` column on the `Appointments` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Appointments" DROP COLUMN "services",
ADD COLUMN     "services" TEXT[];
