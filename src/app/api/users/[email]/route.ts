import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const email = (await params).email;
  try {
    const res = await prisma.user.findUnique({
      where: { email: email },
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  const usrEmail = (await params).email;
  try {
    const req = await request.json();
    const res = await prisma.user.update({
      where: {
        email: usrEmail,
      },
      data: req.user,
      include: {
        tasks: true,
      },
    });
    await prisma.$disconnect();
    return NextResponse.json({ user: res });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    return NextResponse.json({ message: error });
  }
}
