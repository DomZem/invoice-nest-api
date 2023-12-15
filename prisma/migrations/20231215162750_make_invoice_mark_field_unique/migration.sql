/*
  Warnings:

  - A unique constraint covering the columns `[mark]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoice_mark_key" ON "Invoice"("mark");
