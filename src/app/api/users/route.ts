import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
      const users = await prisma.user.findMany()
      return NextResponse.json({data:users})
  } catch (error) {
    return NextResponse.json({error: error}, {status: 500})
  }
}