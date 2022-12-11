/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CategoriesOnPins` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnPins" DROP CONSTRAINT "CategoriesOnPins_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnPins" DROP CONSTRAINT "CategoriesOnPins_pinId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
DROP COLUMN "updatedAt",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "name" TEXT;

-- DropTable
DROP TABLE "CategoriesOnPins";

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToPin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToPin_AB_unique" ON "_CategoryToPin"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToPin_B_index" ON "_CategoryToPin"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToPin" ADD CONSTRAINT "_CategoryToPin_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToPin" ADD CONSTRAINT "_CategoryToPin_B_fkey" FOREIGN KEY ("B") REFERENCES "Pin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
