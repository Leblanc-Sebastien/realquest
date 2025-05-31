import { PrismaClient } from 'prisma-client';
import { getUserIdFromToken } from '../utils/auth/getUserIdFromToken';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const userId = getUserIdFromToken(event);

  const user = await prisma.user.findUnique({
    where: { id: userId as number },
    select: {
      id: true,
      level: true,
      logs: true,
      mail: true,
      title: true,
      userName: true,
      xp: true,
    },
  });
  return user;
});
