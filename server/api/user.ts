import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  })

  return user
})