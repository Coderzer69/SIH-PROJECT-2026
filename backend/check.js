const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.doctorProfile.deleteMany({
    where: { user: { email: 'urvishbhardwaj7@gmail.com' } }
  });
  await prisma.patientProfile.deleteMany({
    where: { user: { email: 'urvishbhardwaj7@gmail.com' } }
  });
  await prisma.user.deleteMany({
    where: { email: 'urvishbhardwaj7@gmail.com' }
  });
  console.log('Deleted user successfully.');
}

main().finally(() => prisma.$disconnect());
