import { PrismaClient } from 'prisma-client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();

  const userId = getUserIdFromToken(event);
  const body = await readBody(event);

  const { title, description, frequency, repeat } = body;

  if (!title) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Titre obligatoire !',
    });
  } else if (!description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Description obligatoire !',
    });
  } else if (!frequency) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Frequence obligatoire !',
    });
  }

  const quest = await prisma.quest.create({
    data: {
      title,
      description,
      frequency,
      repeat,
      userId,
    },
  });

  return {
    quest,
    success: true,
    message: 'Quête créée avec succès',
  };
});
