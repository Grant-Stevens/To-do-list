import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/src/generated/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.task.findMany();
    await prisma.$disconnect();
    return NextResponse.json({ tasks: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}

export async function POST(request: NextRequest) {
  if (!request) return;
  try {
    const req = await request.json();
    const res = await prisma.task.create({
      data: req.task,
    });
    return NextResponse.json({ task: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}

// export async function PATCH(request: NextRequest) {
//   if (!request) return;
//   try {
//     const req = await request.json();
//     const res = await prisma.task.update({
//       where: {
//         id: req.task.id,
//         userId: req.task.userId,
//       },
//       data: req.task,
//     });
//     return NextResponse.json({ tasks: res });
//   } catch (error) {
//     console.error(error);
//     await prisma.$disconnect();
//     return NextResponse.json({ message: error });
//   }
// }
