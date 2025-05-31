import { PrismaClient } from 'prisma-client';
import bcrypt from 'bcryptjs';

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  const body = await readBody(event);

  const { userName, password, mail, confirmPassword } = body;
  if (!userName) {
    return createError({
      statusCode: 400,
      statusMessage: 'Pseudo obligatoire !',
    });
  } else if (!password) {
    return createError({
      statusCode: 400,
      statusMessage: 'Password obligatoire !',
    });
  } else if (!mail) {
    return createError({
      statusCode: 400,
      statusMessage: 'Email obligatoire !',
    });
  } else if (password !== confirmPassword) {
    return createError({
      statusCode: 400,
      statusMessage: 'Les passwords doivent être identiques !',
    });
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ userName }, { mail }],
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

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'utilisateur
  const user = await prisma.user.create({
    data: {
      userName,
      mail,
      level: 1,
      xp: 0,
      title: 'NOOB',
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    userName: user.userName,
    success: true,
    message: 'User registered successfully',
  };
});
