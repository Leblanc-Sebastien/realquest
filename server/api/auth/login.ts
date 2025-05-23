import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { userName, password } = body

    if (!userName || !password) {
        throw createError({ statusCode: 400, message: 'userName and password required' })
    }

    const user = await prisma.user.findUnique({ where: { userName } })
    if (!user) throw createError({ statusCode: 401, message: 'Invalid user' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw createError({ statusCode: 401, message: 'Invalid password' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '7d' })

    return { 
        token,
        user: {
            id: user.id,
            userName : user.userName,
            xp : user.xp,
            level : user.level,
            title : user.title,
        }
    }
})