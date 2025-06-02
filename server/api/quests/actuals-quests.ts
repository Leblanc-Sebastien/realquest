import { PrismaClient } from 'prisma-client';
import { getUserIdFromToken } from '../../utils/auth/getUserIdFromToken';
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const userId = getUserIdFromToken(event);
  const now = new Date();

  const quests = await prisma.quest.findMany({
    where: {
      userId: userId as number,
      OR: [
        {
          frequency: 'NONE',
          logs: {
            none: {},
          },
        },
        {
          frequency: 'DAILY',
          logs: {
            none: {
              completedAt: {
                gte: startOfDay(now),
                lte: endOfDay(now),
              },
            },
          },
        },
        {
          frequency: 'WEEKLY',
          logs: {
            none: {
              completedAt: {
                gte: startOfWeek(now, { weekStartsOn: 1 }),
                lte: endOfWeek(now, { weekStartsOn: 1 }),
              },
            },
          },
        },
        {
          frequency: 'MONTHLY',
          logs: {
            none: {
              completedAt: {
                gte: startOfMonth(now),
                lte: endOfMonth(now),
              },
            },
          },
        },
      ],
    },
  });
  return quests;
});
