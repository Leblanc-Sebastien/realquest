import { PrismaClient } from '@prisma/client'
import { getUserIdFromToken } from '../utils/auth/getUserIdFromToken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {

  const userId = getUserIdFromToken(event) 
  console.log('✅ userId:', userId)

  const quests = await prisma.quest.findMany({
    where: {
        userId: userId as number
    },
  })
  console.log('📥 API /quests hit')
  return quests
})