import { PrismaClient } from '@prisma/client'
// import { prisma } from '../utils/prisma'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  })

  return user
})