"use server"

import { PrismaClient } from '@/generated/prisma';
//import { startOfDay, endOfDay } from 'date-fns';

const prisma = new PrismaClient();

export async function getTodayUseByUserId(userId: string) {
  const startOfDay = new Date(new Date().setHours(0,0,0,0));
  const endOfDay = new Date(new Date().setHours(23,59,59,999));
  return await prisma.freeUsage.count({
    where: {
      userId,
      usedAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });
}

export async function canUseFeature(userId: string): Promise<number | 'limit' | 'subscribed'> {
  // 1. Vérifie d’abord l’abonnement
  const sub = await prisma.subscription.findUnique({
    where: { userId },
    select: { status: true, endsAt: true },
  });

  if (sub?.status === 'active' && sub.endsAt && sub.endsAt > new Date()) {
    return 'subscribed'; // illimité
  }

  // 2. Sinon, compte les usages du jour
  const todayUse = await getTodayUseByUserId(userId)

  return todayUse < 5 ? todayUse : 'limit';
}

export async function useFeature(userId: string) {
  return await prisma.freeUsage.create({
    data: {
      userId
    }
  })
}