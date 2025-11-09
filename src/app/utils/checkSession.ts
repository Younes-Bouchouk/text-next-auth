import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function checkSession() {
  const session = await auth();
  
  if (!session) {
    redirect("/login")
  } 

  return session
}