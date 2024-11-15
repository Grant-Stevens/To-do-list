"user server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      include: { tasks: true },
    });
    await prisma.$disconnect();
    console.log(users);
    return users;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: true,
      },
    });
    await prisma.$disconnect();
    console.log(tasks);
    return tasks;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function updateUser() {
  try {
    const res = await prisma.user.upsert({
      where: {
        id: 1,
      },
      create: {
        name: "Grant Stevens",
        email: "grantstevens22@gmail.com",
        tasks: {
          create: {
            title: "Hello",
            content: "World",
          },
        },
      },
      update: {
        tasks: {
          upsert: {
            where: { id: 1 },
            create: {
              title: "Hello",
              content: "World",
            },
            update: {
              title: "Hello",
              content: "World",
            },
          },
        },
      },
      include: {
        tasks: true,
      },
    });
    await prisma.$disconnect();
    console.log(res);
    return res;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

async function main() {
  // await getUsers();
  await getTasks();
  // await updateUser();
}

main();
