"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"
import { LogoutButton } from "@/components/AuthButtons"

interface User {
  name?: string | null
  email?: string | null
  image?: string | null
}

export const Profile = ({ user }: { user: User | undefined }) => {

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-8">
      {user?.image && (
        <img
          src={user?.image}
          alt="Avatar"
          className="w-24 h-24 rounded-full mb-4"
        />
      )}
      <h1 className="text-2xl font-bold mb-1">{user?.name}</h1>
      <p className="text-gray-600 mb-4">{user?.email}</p>

      <LogoutButton/>
    </div>
  )
}

