import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { LoginButton } from '@/components/AuthButtons'

export default async function LoginPage() {

  const session = await auth()

  if (session){
    redirect("/profile")
  }

  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Page Login -</h1>
        {session 
          ? <p className="text-green-500">(Vous êtes authentifié)</p> 
          : <p className="text-red-500">(Vous n'êtes pas anthentifié)</p>
        }
      </div>
      <div className='flex flex-col gap-2'>
        <LoginButton/>
      </div>
    </main>
  )
}
