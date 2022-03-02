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

// const postgres = require('postgres');

// const options = {};
// const sql = postgres(
//   'postgresql://kirbypaint:randompassword@localhost:5432/primelogs?schema=public',
// ); // will default to the same as psql

// async function postgresPls() {
//   var absolutePath = path.resolve(path.join('prisma', 'testCopy.csv'));
//   const result = await sql`
//     COPY "TestCsv" FROM ${sql(absolutePath)} DELIMITER ',' CSV STDIN;
//   `;
//   sql.end({ timeout: null });
//   return result;
// }

var { Pool, Client } = require('pg');
var copyFrom = require('pg-copy-streams').from;

async function main() {
  await prisma.$connect();

  const query = `COPY "TestCsv" FROM $1 DELIMITER ',' CSV STDIN;`;
  const absolutePath = [path.resolve(path.join('prisma', 'testCopy.csv'))];

  var pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  pool.connect(function (err, client, done) {
    var stream = client.query(copyFrom('COPY "TestCsv" FROM STDIN'));
    var fileStream = fs.createReadStream('/prisma/testCopy.csv');
    fileStream.on('error', done);
    // stream.on('error', done);
    // stream.on('finish', done);
    fileStream.pipe(stream);
  });
  // pool.query('SELECT NOW()', (err, res) => {
  //   console.log(err, res);
  //   pool.end();
  // });
  // const client = new Client({
  //   connectionString: process.env.DATABASE_URL,
  // });
  // client.connect();
  // // const text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *';
  // // const values = ['brianc', 'brian.m.carlson@gmail.com'];
  // // callback
  // client.query(query, absolutePath, (err, res) => {
  //   if (err) {
  //     console.log(err.stack);
  //   } else {
  //     console.log(res.rows[0]);
  //     // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  //   }
  // });
  // const result = await postgresPls();
  // console.log('result', result);
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
