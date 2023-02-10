/*
  Warnings:

  - You are about to drop the column `orderId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_orderId_fkey";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "items" TEXT[];

-- AlterTable
ALTER TABLE "product" DROP COLUMN "orderId";
