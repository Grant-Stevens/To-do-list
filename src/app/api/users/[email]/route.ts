import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  console.log("GET USER");
  const email = (await params).email;
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    await prisma.$disconnect();
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
    return NextResponse.json({ error });
  }
}
