import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import { stream } from './seed';

const prisma = new PrismaClient();

export async function seedPrime2() {
  await main();
}

async function main() {
  await prisma.$connect();
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
