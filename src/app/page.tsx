"use client"

import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "../components/AuthButtons";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {

  const [users, setUsers] = useState<any>()
  
  useEffect(() => {
    const loadUsers = async () => {
      const { data } = await supabase.from("users").select();
      setUsers(data ?? []);
    };
    loadUsers();
  }, []);

  console.log(users)
  
  const {data: session} = useSession()

  console.log("Infos de l'utilisateur authentifié", session?.user)
  
  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Page d'accueil -</h1>
        {session 
          ? <p className="text-green-500">(Vous êtes authentifié)</p> 
          : <p className="text-red-500">(Vous n'êtes pas anthentifié)</p>
        }
      </div>
      <div>
        {session?.user ? 
          <LogoutButton/>
          :
          <LoginButton/>
        }
      </div>
    </main>
  );
}
