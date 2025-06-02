const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedUser() {
  return await prisma.user.upsert({
    where: { userName: 'SuGii' },
    update: {},
    create: {
      userName: 'SuGii',
      mail: 'sugii.noob@gmail.com',
      password: 'michel',
      xp: 0,
      level: 1,
      title: 'NOOB',
    },
  });
}

async function main() {
  const user = await seedUser();
  console.log('✅ User created:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
