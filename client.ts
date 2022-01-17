import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  rejectOnNotFound: true,
});
export default prisma;
