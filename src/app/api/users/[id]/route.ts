import { NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient()

export async function GET(context: {params: Promise<{ id: string }>}) {    
  try {
    const { id } = await context.params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID non trouvé' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({where: {id: id.toString()}})
 
    return NextResponse.json({data: user});

  } catch (error) {
    return NextResponse.json({error: "Problème serveur"}, {status: 500})
  }
}
