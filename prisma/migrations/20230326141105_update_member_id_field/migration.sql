/*
  Warnings:

  - You are about to drop the column `marryId` on the `Member` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_marryId_fkey";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "marryId",
ADD COLUMN     "marry_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Member" ADD FOREIGN KEY ("marry_id") REFERENCES "Marry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
