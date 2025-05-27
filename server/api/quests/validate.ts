import { PrismaClient } from "prisma-client"

export default defineEventHandler(async (event) => {

    const prisma = new PrismaClient()

    const userId = getUserIdFromToken(event)
    const body = await readBody(event)
    let xpToAdd = 0

    const { questId  } = body

    if(!questId){
        throw createError({ statusCode: 400, statusMessage: 'Quête invalidable !'})
    }

    const quest = await prisma.quest.findUnique({
        where : {
            id : questId
        }
    })

    if(!quest){
        throw createError({statusCode: 404, statusMessage: 'Quête introuvable !'})
    }

    const questLog = await prisma.questLog.create({
        data: {
            questId : quest.id,
            userId
        }
    })

    switch (quest.frequency){
        case "NONE" : xpToAdd = 20
        break
        case "DAILY" : xpToAdd = 10
        break
        case "WEEKLY" : xpToAdd = 20
        break
        case "MONTHLY" : xpToAdd = 30
        break
    }

    const updatedUser = await prisma.user.update({
        where : {
            id : userId
        },
        data : {
            xp : {increment : xpToAdd}
        }
    })

    return{
        questLog,
        success: true,
        message: 'Quête validée avec succès !',
        updatedUser
    }
})