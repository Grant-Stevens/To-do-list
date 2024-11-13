import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  console.log("GET USERS");
  try {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    console.log(users);
    return NextResponse.json({ users });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function POST(request: NextRequest) {
  console.log("POST USER");
  if (!request) return;
  try {
    const req = await request.json();
    console.log("POST REQUEST:", req);
    const user = await prisma.user.create({
      data: req.user,
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

export async function UPDATE(request: NextRequest) {
  console.log("UPDATE USER");
  if (!request) return;
  try {
    const req = await request.json();
    console.log("POST REQUEST:", req);
    const user = await prisma.user.update({
      where: {
        email: req.user.email,
      },
      data: req.user,
    });
    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}
