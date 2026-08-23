import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.user.findMany({ where: { role: 'ADMIN' } })
  .then(users => console.log(JSON.stringify(users, null, 2)))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
