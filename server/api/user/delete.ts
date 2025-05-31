import { PrismaClient } from 'prisma-client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const userId = getUserIdFromToken(event);

  try {
    await console.log('✅ Token userId:', userId);
    const deleteUser = await prisma.user.delete({
      where: {
        id: userId as number,
      },
    });

    return {
      deleteUser,
      success: true,
      message: 'Utilisateur supprimé avec succès !',
    };
  } catch (err) {
    console.error('Erreur lors de la suppression du compte :', err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Impossible de supprimer le compte !',
    });
  } finally {
    await prisma.$disconnect();
  }
});
