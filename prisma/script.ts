import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await getUsers();
}

async function getUsers() {
  const users = await prisma.user.findMany()
  console.log(users)
}

async function addUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
    },
  })
  console.log(user)

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })