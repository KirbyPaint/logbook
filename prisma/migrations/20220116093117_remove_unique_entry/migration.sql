-- DropIndex
DROP INDEX "Prime2Log_entry_key";

-- DropIndex
DROP INDEX "Prime3Log_entry_key";

-- DropIndex
DROP INDEX "PrimeLog_entry_key";

-- AlterTable
ALTER TABLE "PrimeLog" ALTER COLUMN "firstLocation" DROP NOT NULL;
