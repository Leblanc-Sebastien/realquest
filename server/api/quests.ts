import { PrismaClient } from 'prisma-client'
import { getUserIdFromToken } from '../utils/auth/getUserIdFromToken'


export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient()

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