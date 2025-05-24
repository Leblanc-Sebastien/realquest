const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


async function seedUser(){

  return await prisma.user.upsert({
    where: { userName: 'SuGii' },
    update: {},
    create: {
      userName: 'SuGii',
      mail: 'sugii.noob@gmail.com',
      password : 'michel',
      xp: 0,
      level: 1,
      title: 'NOOB',
    },
  })
}

async function seedQuest(userId){

  const quests = []

  const scheduledAt = new Date()
  scheduledAt.setHours(20, 0, 0, 0)


  quests.push(
    await prisma.quest.upsert({
      where: {title :'Repeindre le bureau' },
      update: {},
      create: {
        title: 'Repeindre le bureau',
        description: 'Transformer le blanc en vert',
        scheduledAt,
        frequency : "NONE",
        repeat : false,
        userId
      }
    })
  )

  quests.push(
    await prisma.quest.upsert({
      where: {title :'Faire du scream' },
      update: {},
      create: {
        title: 'Faire du scream',
        description: 'Essayer de gueuler le plus fort possible.',
        scheduledAt,
        frequency : "DAILY",
        repeat : true,
        userId
      }
    })
  )
  quests.push(
    await prisma.quest.upsert({
      where: {title :'Faire 1h de sport' },
      update: {},
      create: {
        title: 'Faire 1h de sport',
        description: 'Avoir des bras énormes et secs',
        scheduledAt,
        frequency : "DAILY",
        repeat : true,
        userId
      }
    })
  )

   quests.push(
    await prisma.quest.upsert({
      where: {title :'Faire du sport' },
      update: {},
      create: {
        title: 'Faire du sport',
        description: 'Courrir 45mins et faire du gainage.',
        scheduledAt,
        frequency : "WEEKLY",
        repeat : true,
        userId
      }
    })
  )

  quests.push(
    await prisma.quest.upsert({
      where: {title :'Apprendre le c++' },
      update: {},
      create: {
        title: 'Apprendre le c++',
        description: 'Personne sait mais c\'est stylé',
        scheduledAt,
        frequency : "WEEKLY",
        repeat : true,
        userId
      }
    })
  )

  quests.push(
    await prisma.quest.upsert({
      where: {title :'Faire le ménage complet de la maison' },
      update: {},
      create: {
        title: 'Faire le ménage complet de la maison',
        description: 'Avoir la maison la plus propre possible.',
        scheduledAt,
        frequency : "MONTHLY",
        repeat : true,
        userId
      }
    })
  )

  quests.push(
    await prisma.quest.upsert({
      where: {title :'Perdre 3 kilos' },
      update: {},
      create: {
        title: 'Perdre 3 kilos',
        description: 'Bah maigrir quoi',
        scheduledAt,
        frequency : "MONTHLY",
        repeat : true,
        userId
      }
    })
  )

  return quests
}

async function main() {
  const user = await seedUser()
  const quest = await seedQuest(user.id)

  console.log('✅ User created:', user)
  console.log('✅ Quest created:', quest)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })