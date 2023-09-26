/*
  Warnings:

  - You are about to drop the column `day` on the `Schedules` table. All the data in the column will be lost.
  - You are about to drop the `Hours` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end` to the `Schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `Schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hours" DROP CONSTRAINT "Hours_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Schedules" DROP COLUMN "day",
ADD COLUMN     "days" TEXT[],
ADD COLUMN     "end" TEXT NOT NULL,
ADD COLUMN     "start" TEXT NOT NULL;

-- DropTable
DROP TABLE "Hours";
