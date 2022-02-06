import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  // 2;
  await prime2CreatureData(
    'Prime2_CreatureData.csv',
    PrimeLogDataCategory.CREATURES,
  );
  await prime2LoreData('Prime2_LoreData.csv', PrimeLogDataCategory.LORE);
  await prime2ResearchData(
    'Prime2_ResearchData.csv',
    PrimeLogDataCategory.RESEARCH,
  );
}

async function stream(filename: string): Promise<string[][]> {
  const filePath = path.join(__dirname, 'seedData', filename);
  let result: string[][] = [];
  const input = fs.createReadStream(filePath);
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
      result.push(row);
    }
  } finally {
    input.close();
  }
  return result;
}

async function prime2CreatureData(
  filename: string,
  logCategory: PrimeLogDataCategory,
) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      logCategory,
      entry: entry[0] ?? 'Failed to parse CSV',
      firstLocation: entry[1] ?? 'Failed to parse CSV',
      entryText: entry[2] ?? 'Failed to parse CSV',
      limitedScan: entry[3] === 'Yes' ? true : false,
      notes: entry[4] ?? 'Failed to parse CSV',
      image: entry[5] ?? 'Failed to parse CSV',
      majorCategory: entry[6] ?? 'Failed to parse CSV',
      minorCategory: entry[7] ?? 'Failed to parse CSV',
      subCategory: entry[8] ?? 'Failed to parse CSV',
    };
    await prisma.prime2Log.create({ data: logItem });
  }
}

async function prime2LoreData(
  filename: string,
  logCategory: PrimeLogDataCategory,
) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      logCategory,
      entry: entry[0] ?? 'Failed to parse CSV',
      firstLocation: entry[1] ?? 'Failed to parse CSV',
      entryText: entry[2] ?? 'Failed to parse CSV',
      image: entry[3] ?? 'Failed to parse CSV',
      majorCategory: entry[4] ?? 'Failed to parse CSV',
      minorCategory: entry[5] ?? 'Failed to parse CSV',
      subCategory: entry[6] ?? 'Failed to parse CSV',
    };
    await prisma.prime2Log.create({ data: logItem });
  }
}

async function prime2ResearchData(
  filename: string,
  logCategory: PrimeLogDataCategory,
) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      logCategory,
      entry: entry[0] ?? 'Failed to parse CSV',
      firstLocation: entry[1] ?? 'Failed to parse CSV',
      entryText: entry[2] ?? 'Failed to parse CSV',
      limitedScan: entry[3] === 'Yes' ? true : false,
      notes: entry[4] ?? 'Failed to parse CSV',
      image: entry[5] ?? 'Failed to parse CSV',
      majorCategory: entry[6] ?? 'Failed to parse CSV',
      minorCategory: entry[7] ?? 'Failed to parse CSV',
    };
    await prisma.prime2Log.create({ data: logItem });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
