-- CreateEnum
CREATE TYPE "PrimeLogDataCategory" AS ENUM ('Pirate Data', 'Chozo Lore', 'Creatures', 'Research', 'Artifacts');

-- CreateTable
CREATE TABLE "PrimeLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logCategory" "PrimeLogDataCategory" NOT NULL,
    "entry" TEXT NOT NULL,
    "firstLocation" TEXT NOT NULL,
    "entryText" TEXT NOT NULL,
    "limitedScan" BOOLEAN,
    "notes" TEXT,
    "image" TEXT,
    "scannedById" UUID,

    CONSTRAINT "PrimeLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prime2Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logCategory" "PrimeLogDataCategory" NOT NULL,
    "entry" TEXT NOT NULL,
    "firstLocation" TEXT NOT NULL,
    "entryText" TEXT NOT NULL,
    "limitedScan" BOOLEAN,
    "notes" TEXT,
    "image" TEXT,
    "planet" TEXT,
    "biome" TEXT,
    "scannedById" UUID,

    CONSTRAINT "Prime2Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prime3Log" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logCategory" "PrimeLogDataCategory" NOT NULL,
    "entry" TEXT NOT NULL,
    "firstLocation" TEXT NOT NULL,
    "entryText" TEXT NOT NULL,
    "limitedScan" BOOLEAN,
    "notes" TEXT,
    "image" TEXT,
    "scannedById" UUID,

    CONSTRAINT "Prime3Log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "PrimeLog" ADD CONSTRAINT "PrimeLog_scannedById_fkey" FOREIGN KEY ("scannedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prime2Log" ADD CONSTRAINT "Prime2Log_scannedById_fkey" FOREIGN KEY ("scannedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prime3Log" ADD CONSTRAINT "Prime3Log_scannedById_fkey" FOREIGN KEY ("scannedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
