import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  context: {params: Promise<{ id: string }>}
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: 'ID non trouvé' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: id.toString() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
    }

    return NextResponse.json({ data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Problème serveur' }, { status: 500 });
  }
}
