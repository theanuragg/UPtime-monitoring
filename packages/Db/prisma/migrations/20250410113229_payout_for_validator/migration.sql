-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- AlterTable
ALTER TABLE "Validator" ADD COLUMN     "pendingPayout" INTEGER NOT NULL DEFAULT 0;
