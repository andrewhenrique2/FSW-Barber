/*
  Warnings:

  - You are about to drop the column `createAt` on the `Barbershop` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Barbershop` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barbershop" DROP COLUMN "createAt",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Barbershop_email_key" ON "Barbershop"("email");
