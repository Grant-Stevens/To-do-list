import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const res = await prisma.user.findMany({
      include: { tasks: true },
    });
    await prisma.$disconnect();
    return NextResponse.json({ user: res });
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
    const res = await prisma.user.create({
      data: { ...req.user },
    });
    return NextResponse.json({ user: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}
