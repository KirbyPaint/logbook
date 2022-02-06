import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import { stream } from './seed';

const prisma = new PrismaClient();

export async function seedPrime3() {
  await main();
}

async function main() {
  await prisma.$connect();
  await prime3CreatureData(
    'Prime3_CreatureData.csv',
    PrimeLogDataCategory.CREATURES,
  );
  await prime3LoreData('Prime3_LoreData.csv', PrimeLogDataCategory.LORE);
  await prime3ResearchData(
    'Prime3_ResearchData.csv',
    PrimeLogDataCategory.RESEARCH,
  );
}

// Out of order due to stupid issues
async function prime3CreatureData(
  filename: string,
  logCategory: PrimeLogDataCategory,
) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      logCategory,
      entry: entry[0] ?? 'Failed to parse CSV',
      firstLocation: entry[1] ?? 'Failed to parse CSV',
      limitedScan: entry[2] === 'Yes' ? true : false,
      entryText: entry[3] ?? 'Failed to parse CSV',
      notes: entry[4] ?? 'Failed to parse CSV',
      majorCategory: entry[5] ?? 'Failed to parse CSV',
    };
    await prisma.prime3Log.create({ data: logItem });
  }
}

async function prime3LoreData(
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
    };
    await prisma.prime3Log.create({ data: logItem });
  }
}

async function prime3ResearchData(
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
    await prisma.prime3Log.create({ data: logItem });
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
