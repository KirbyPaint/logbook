import { PrismaClient } from '@prisma/client';
import { stream } from './seed';

const prisma = new PrismaClient();

export async function seedDefaultUsers() {
  await main();
}

async function main() {
  await prisma.$connect();
  await seedUsers('exampleUsers.csv');
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
