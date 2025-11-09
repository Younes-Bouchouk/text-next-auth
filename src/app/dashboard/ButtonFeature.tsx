"use client"

import { canUseFeature, useFeature } from "@/lib/checkUsage"
import { Session } from "next-auth"
import { useRouter } from "next/navigation"


export const ButtonFeature = ({session}: {session: Session}) => {

    // 1. const handleClick = async () => { … }
  // 2. Appelle canUseFeature + insertUsage
  // 3. Si 'limit' → ouvre le popup
  const router = useRouter()

  const handleClick = async () => {
    const can = await canUseFeature(session.user?.id!!)
    if (can === "subscribed") {
      console.log("Bien vu pour l'abonnement, fais toi plaisir")
      await useFeature(session.user.id)
      router.refresh()
    } else if (can === "limit") {
      console.log("T'as atteind la limite fréro")
    } else {
      console.log(`Tu est à ${can}/5`)
      await useFeature(session.user.id)
      router.refresh()
    }
  }

  return (
    <div>
      <button
        className="w-fit py-2 px-5 rounded shadow bg-gray-200 hover:bg-blue-200 transition ease-in duration-75"
        onClick={handleClick}>Utiliser features
      </button>
    </div>
  )
}
