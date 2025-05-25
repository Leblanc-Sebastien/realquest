import { PrismaClient } from '@prisma/client'
import  jwt  from 'jsonwebtoken'
// import { prisma } from '../utils/prisma'

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  const token = authHeader?.split(' ')[1]

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        userName: true,
        mail: true,
        xp: true,
        level: true,
        title: true
      }
    })

    if (!user) {
      throw createError({ statusCode: 404, statusMessage: 'Utilisateur non trouvé' })
    }

    return user
  } catch (err) {
      console.error('Erreur JWT:', err)
      throw createError({ statusCode: 401, statusMessage: 'Token invalide' })
  }
})