/*
  Warnings:

  - You are about to drop the column `description` on the `Plans` table. All the data in the column will be lost.
  - Added the required column `maxAppointments` to the `Plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plans" DROP COLUMN "description",
ADD COLUMN     "maxAppointments" INTEGER NOT NULL;
