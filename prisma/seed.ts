import { PrismaClient } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';
import * as readline from 'readline';
import * as parse from 'csv-parse/lib/sync';
import { seedDefaultUsers } from './seedDefaultUsers';
import { seedPrime1 } from './seedPrime1';
import { seedPrime2 } from './seedPrime2';
import { seedPrime3 } from './seedPrime3';

const prisma = new PrismaClient();

const postgres = require('postgres');

const options = {};
const sql = postgres(
  'postgresql://kirbypaint:randompassword@localhost:5432/primelogs?schema=public',
); // will default to the same as psql

async function postgresPls() {
  var absolutePath = path.resolve(path.join('prisma', 'testCopy.csv'));
  const result = await sql`
    COPY "TestCsv" FROM ${sql(absolutePath)} DELIMITER ',' CSV STDIN;
  `;
  sql.end({ timeout: null });
  return result;
}

async function main() {
  await prisma.$connect();
  const result = await postgresPls();
  console.log('result', result);
  // await seedTest();
  // await seedPrime1();
  // await seedPrime2();
  // await seedPrime3();
  // await seedDefaultUsers();
}

// for copying
// await prisma.$executeRaw`;`;
async function seedTest() {
  // can the program open its own terminal to connect with
  await prisma.$executeRaw`psql -U postgres`;
  const result =
    await prisma.$executeRaw`copy "TestCsv" FROM 'testCopy.csv' DELIMITER ',';`;
  console.log('result', result);
}

export async function stream(filename: string): Promise<string[][]> {
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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
