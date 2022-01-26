import { PrimeLogDataCategory, PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';

const prisma = new PrismaClient();

// Ultimately find a way that each seed file is only responsible for its own logs
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
  await prime3LoreData('Prime3_LoreData.csv', PrimeLogDataCategory.LORE);
  await prime3ResearchData(
    'Prime3_ResearchData.csv',
    PrimeLogDataCategory.RESEARCH,
  );
  // Users
  await seedUsers('exampleUsers.csv');
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

// Prime 2

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

// Come back to this one since my fucking hours of data entry didn't save
// bullshit
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
      entryText: entry[2] ?? 'Failed to parse CSV',
      limitedScan: entry[3] === 'Yes' ? true : false,
      notes: entry[4] ?? 'Failed to parse CSV',
      image: entry[5] ?? 'Failed to parse CSV',
      majorCategory: entry[6] ?? 'Failed to parse CSV',
      minorCategory: entry[7] ?? 'Failed to parse CSV',
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

async function seedUsers(filename: string) {
  const entries = await stream(filename);
  for (const entry of entries) {
    const logItem = {
      email: entry[0],
      name: entry[1],
      username: entry[2],
      password: entry[3],
    };
    await prisma.user.create({ data: logItem });
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
