/*
  Warnings:

  - You are about to drop the column `ckerk` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerk]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerk` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_ckerk_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ckerk",
ADD COLUMN     "clerk" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerk_key" ON "User"("clerk");
