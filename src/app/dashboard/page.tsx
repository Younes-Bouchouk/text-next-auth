// src/app/dashboard/page.tsx
import { LogoutButton } from "@/components/AuthButtons"
import checkSession from "../utils/checkSession"
import { canUseFeature, getTodayUseByUserId } from "@/lib/checkUsage"
import { Session } from "next-auth"
import { ButtonFeature } from "./ButtonFeature"
import { prisma } from "@/lib/prisma"

export default async function DashboardPage() {

  const session = await checkSession()

  const usages = await getTodayUseByUserId(session.user!.id!)

  return (  
    <main className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Page Dashboard -</h1>
        {session 
          ? <p className="text-green-500">(Vous êtes authentifié)</p> 
          : <p className="text-red-500">(Vous n'êtes pas anthentifié)</p>
        }
      </div>
      <div className="flex items-center gap-2">
        <p>Utilisation quotidienne : {usages}/5</p>
      </div>

      <ButtonFeature session={session}/>

      <LogoutButton/>
    </main>
  )
}

