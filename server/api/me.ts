import { PrismaClient } from '@prisma/client'
import  jwt  from 'jsonwebtoken'
import { getUserIdFromToken } from '../utils/auth/getUserIdFromToken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const userId = getUserIdFromToken(event)
 
    const user = await prisma.user.findUnique({
      where: { id: userId as number },
      select: {
        id: true,
        userName: true,
        mail: true,
        xp: true,
        level: true,
        title: true
      }
    })
    return user
})