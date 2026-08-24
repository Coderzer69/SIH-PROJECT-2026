const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const doc = await prisma.doctorProfile.findFirst();
    if (!doc) return console.log('no docs');
    
    const admin = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    
    await prisma.doctorProfile.update({
      where: { id: doc.id },
      data: {
        verificationStatus: 'APPROVED',
        verifiedById: admin ? admin.id : null,
      },
    });
    console.log('success');
  } catch (err) {
    console.error(err);
  }
}
test();
