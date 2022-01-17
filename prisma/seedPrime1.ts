import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  await prime1ArtifactData(
    'Prime1_ArtifactData.csv',
    PrimeLogDataCategory.ARTIFACTS,
  );
  await prime1ChozoData(
    'Prime1_ChozoData.csv',
    PrimeLogDataCategory.CHOZO_LORE,
  );
  await prime1CreatureData(
    'Prime1_CreatureData.csv',
    PrimeLogDataCategory.CREATURES,
  );
  await prime1PirateData(
    'Prime1_PirateData.csv',
    PrimeLogDataCategory.PIRATE_DATA,
  );
  await prime1ResearchData(
    'Prime1_ResearchData.csv',
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

async function prime1ArtifactData(
  filename: string,
  logCategory: PrimeLogDataCategory,
) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      logCategory,
      entry: entry[0] ?? 'Failed to parse CSV',
      entryText: entry[1] ?? 'Failed to parse CSV',
    };
    await prisma.prime1Log.create({ data: logItem });
  }
}

async function prime1ChozoData(
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
    };
    await prisma.prime1Log.create({ data: logItem });
  }
}

async function prime1CreatureData(
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
    };
    await prisma.prime1Log.create({ data: logItem });
  }
}

async function prime1PirateData(
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
    };
    await prisma.prime1Log.create({ data: logItem });
  }
}

async function prime1ResearchData(
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
    };
    await prisma.prime1Log.create({ data: logItem });
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
