import { PrismaClient } from 'prisma-client';
import { levelConfig } from '@/utils/levelConfig';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const userId = getUserIdFromToken(event);
  const body = await readBody(event);
  let xpToAdd = 0;

  const { questId } = body;

  if (!questId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Quête invalidable !',
    });
  }

  const quest = await prisma.quest.findUnique({
    where: {
      id: questId,
    },
  });

  if (!quest) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Quête introuvable !',
    });
  }

  const questLog = await prisma.questLog.create({
    data: {
      questId: quest.id,
      userId,
    },
  });

  switch (quest.frequency) {
    case 'NONE':
      xpToAdd = 20;
      break;
    case 'DAILY':
      xpToAdd = 10;
      break;
    case 'WEEKLY':
      xpToAdd = 20;
      break;
    case 'MONTHLY':
      xpToAdd = 30;
      break;
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!currentUser)
    throw createError({
      statusCode: 404,
      statusMessage: 'Utilisateur introuvable',
    });

  const newXp = (currentUser.xp || 0) + xpToAdd;

  const newLevel =
    levelConfig
      .slice()
      .reverse()
      .find((config) => newXp >= config.minXp) || levelConfig[0];

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      xp: newXp,
      level: newLevel.level,
      title: newLevel.title,
    },
  });

  return {
    questLog,
    success: true,
    message: 'Quête validée avec succès !',
    updatedUser,
  };
});
