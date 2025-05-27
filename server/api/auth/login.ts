
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from 'prisma-client'


export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient()
    const body = await readBody(event)
    const { userName, password } = body

    if (!userName) throw createError({ statusCode: 400, message: 'Username required' })
    if (!password) throw createError({ statusCode: 400, message: 'Password required' })

    const user = await prisma.user.findUnique({ where: { userName } })
    if (!user) throw createError({ statusCode: 401, message: 'Invalid user' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) throw createError({ statusCode: 401, message: 'Invalid password' })

    const secret = process.env.JWT_SECRET
    if (!secret) throw createError({ statusCode: 500, message: 'Server configuration error: JWT_SECRET missing' })

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' })

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