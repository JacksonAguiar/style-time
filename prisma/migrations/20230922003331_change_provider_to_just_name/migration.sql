/*
  Warnings:

  - You are about to drop the column `providerUid` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "providerUid",
ADD COLUMN     "provider" TEXT;
