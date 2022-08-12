// prisma/seed.ts

import { PrismaClient } from '@prisma/client'
import { pins } from '../data/pins'
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: `testemail2@gmail.com`,
      role: 'ADMIN',
    },
  })

  await prisma.pin.create({
    data:pins
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })