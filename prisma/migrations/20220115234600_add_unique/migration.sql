/*
  Warnings:

  - A unique constraint covering the columns `[entry]` on the table `Prime2Log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entry]` on the table `Prime3Log` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[entry]` on the table `PrimeLog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Prime2Log_entry_key" ON "Prime2Log"("entry");

-- CreateIndex
CREATE UNIQUE INDEX "Prime3Log_entry_key" ON "Prime3Log"("entry");

-- CreateIndex
CREATE UNIQUE INDEX "PrimeLog_entry_key" ON "PrimeLog"("entry");
