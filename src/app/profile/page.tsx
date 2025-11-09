import { auth } from '@/lib/auth'
import { Profile } from './components/Profile'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {

  const session = await auth()

  return (
    <main className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">Page Profile -</h1>
        {session 
          ? <p className="text-green-500">(Vous êtes authentifié)</p> 
          : <p className="text-red-500">(Vous n'êtes pas anthentifié)</p>
        }
      </div>
      <Profile user={session?.user}/>
    </main>
  )
}