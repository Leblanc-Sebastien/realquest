import { PrismaClient } from '@prisma/client'
// import { prisma } from '../utils/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const quests = await prisma.quest.findMany({
    where: {
        userId: 1 //temporaire
    },
  })

  return quests
})