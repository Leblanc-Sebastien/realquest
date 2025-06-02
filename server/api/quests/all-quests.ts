import { PrismaClient } from 'prisma-client';
import { getUserIdFromToken } from '../../utils/auth/getUserIdFromToken';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const userId = getUserIdFromToken(event);

  const myQuests = await prisma.quest.findMany({
    where: {
      userId: userId as number,
    },
  });
  return {
    myQuests,
    statusCode: 200,
  };
});
