/*
  Warnings:

  - Added the required column `marryId` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "marryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Marry" (
    "id" SERIAL NOT NULL,
    "marry_date" DATE NOT NULL,
    "photo_url" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Member" ADD FOREIGN KEY ("marryId") REFERENCES "Marry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
