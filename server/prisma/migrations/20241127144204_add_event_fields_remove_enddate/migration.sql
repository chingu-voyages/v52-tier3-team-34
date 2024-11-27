/*
  Warnings:

  - You are about to drop the column `endDate` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endDate",
ADD COLUMN     "artist" TEXT,
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "genre" TEXT[],
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
