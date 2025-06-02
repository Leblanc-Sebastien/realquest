import { PrismaClient } from 'prisma-client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const userId = getUserIdFromToken(event);

  const body = await readBody(event);
  const questId = body.id;

  try {
    const deleteQuest = await prisma.quest.delete({
      where: {
        id: questId as number,
      },
    });

    return {
      deleteQuest,
      success: true,
      message: 'Quête supprimée avec succès !',
    };
  } catch (err) {
    console.error('Erreur lors de la suppression de la quête :', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de supprimer la quête !',
    });
  } finally {
    await prisma.$disconnect();
  }
});
