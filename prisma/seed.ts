import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const file = path.join(__dirname, 'seedData,', 'Prime1_PirateData.csv');

  const input = fs.createReadStream(file);
  try {
    const rl = readline.createInterface({
      input,
      crlfDelay: Infinity,
    });
    let sawHeaders = false;
    for await (const line of rl) {
      if (!sawHeaders) {
        sawHeaders = true;
        continue;
      }
      const row = (parse(line) as unknown as string[][])[0];
      const logItem = {
        logCategory: PrimeLogDataCategory.PIRATE_DATA,
        entry: row[0] ?? 'Failed to parse CSV',
        firstLocation: row[1] ?? 'Failed to parse CSV',
        entryText: row[2] ?? 'Failed to parse CSV',
      };
      await prisma.primeLog.create({ data: logItem });
    }
  } finally {
    input.close();
  }
}

async function stream() {}

async function prime1ArtifactData() {}
async function prime1ChozoData() {}
async function prime1CreatureData() {}
async function prime1PirateData() {}
async function prime1ResearchData() {}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
