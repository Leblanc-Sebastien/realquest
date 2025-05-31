import { PrismaClient } from 'prisma-client';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const userId = getUserIdFromToken(event);

  const body = await readBody(event);
  const { userName, mail } = body;

  if (!userName || !mail) {
    throw createError({
      statusCode: 400,
      statusMessage: "Le nom d'utilisateur et le mail sont obligatoires.",
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      AND: [
        { id: { not: userId as number } },
        {
          OR: [{ userName }, { mail }],
        },
      ],
    },
  });

  if (existingUser) {
    if (existingUser.userName === userName) {
      throw createError({
        statusCode: 409,
        statusMessage: 'Cet Utilisateur existe déjà ...',
      });
    } else {
      throw createError({
        statusCode: 409,
        statusMessage: 'Ce mail est déjà utilisé ...',
      });
    }
  }

  try {
    const editedUser = await prisma.user.update({
      where: {
        id: userId as number,
      },
      data: {
        userName,
        mail,
      },
    });
    return {
      editedUser,
      success: true,
      message: 'Utilisateur édité avec succès !',
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: "Impossible de d'éditer le compte !",
    });
  }
});
