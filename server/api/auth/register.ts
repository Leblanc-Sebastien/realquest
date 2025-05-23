import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { userName, password, mail, confirmPassword } = body
  if (!userName) {
    return createError({ statusCode: 400, statusMessage: 'UserName required' })
  }else if(!password){
    return createError({ statusCode: 400, statusMessage: 'Password required' })
  }else if(!mail){
    return createError({ statusCode: 400, statusMessage: 'Email required' })
  }else if(password !== confirmPassword){
    return createError({ statusCode: 400, statusMessage: 'Password must be identical' })
  }

const existingUser = await prisma.user.findFirst({
  where: {
    OR: [
      { userName },
      { mail }
    ]
  }
})

if (existingUser) {
  if (existingUser.userName === userName) {
    return createError({ statusCode: 409, statusMessage: 'User already exists' })
  } else {
    return createError({ statusCode: 409, statusMessage: 'Mail already exists' })
  }
}

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10)

  // Création de l'utilisateur
  const user = await prisma.user.create({
    data: {
      userName,
      mail,
      level: 1,
      xp: 0,
      title: 'NOOB',
      password: hashedPassword
    }
  })

  return {
    id: user.id,
    userName: user.userName,
    success: true,
    message: 'User registered successfully'
  }
})
