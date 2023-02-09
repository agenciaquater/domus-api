/*
  Warnings:

  - You are about to drop the column `total_price` on the `order` table. All the data in the column will be lost.
  - Added the required column `invoiceId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE "order_order_number_seq";
ALTER TABLE "order" DROP COLUMN "total_price",
ADD COLUMN     "invoiceId" TEXT NOT NULL,
ALTER COLUMN "order_number" SET DEFAULT nextval('order_order_number_seq');
ALTER SEQUENCE "order_order_number_seq" OWNED BY "order"."order_number";

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "cupomId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_cupomId_fkey" FOREIGN KEY ("cupomId") REFERENCES "Cupom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
