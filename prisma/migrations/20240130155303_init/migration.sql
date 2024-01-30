-- CreateEnum
CREATE TYPE "PAYMENT_TERM" AS ENUM ('NET_1', 'NET_7', 'NET_14', 'NET_30');

-- CreateEnum
CREATE TYPE "INVOICE_STATUS" AS ENUM ('DRAFT', 'PENDING', 'PAID');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "streetName" VARCHAR(255) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "postCode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "mark" VARCHAR(25) NOT NULL,
    "clientName" VARCHAR(50) NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "status" "INVOICE_STATUS" NOT NULL DEFAULT 'DRAFT',
    "paymentTerm" "PAYMENT_TERM" NOT NULL DEFAULT 'NET_30',
    "projectDescription" VARCHAR(100) NOT NULL,
    "userId" INTEGER NOT NULL,
    "billFromAddressId" INTEGER NOT NULL,
    "billToAddressId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "invoiceId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_mark_key" ON "Invoice"("mark");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billFromAddressId_fkey" FOREIGN KEY ("billFromAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_billToAddressId_fkey" FOREIGN KEY ("billToAddressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
