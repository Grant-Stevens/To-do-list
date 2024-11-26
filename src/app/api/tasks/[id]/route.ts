import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number.parseInt((await params).id);
  try {
    const res = await prisma.task.findUnique({
      where: { id: id },
    });
    await prisma.$disconnect();
    return NextResponse.json({ task: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("HERE");
  const id = Number.parseInt((await params).id);
  try {
    const req = await request.json();
    const res = await prisma.task.update({
      where: {
        id: id,
      },
      data: req.task,
    });
    await prisma.$disconnect();
    return NextResponse.json({ task: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number.parseInt((await params).id);
  try {
    const res = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}
