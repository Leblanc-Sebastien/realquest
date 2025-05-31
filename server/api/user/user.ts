import { PrismaClient } from 'prisma-client';
// import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id: 1, //temporaire
    },
  });

  return user;
});
