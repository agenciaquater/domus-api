/*
  Warnings:

  - Added the required column `value` to the `Cupom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cupom" ADD COLUMN     "value" TEXT NOT NULL;
