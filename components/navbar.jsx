//import {signIn,useSession} from 'next-auth/react'
import Link from 'next/link'
import { OPTIONS } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth/next'
import variables from '../styles/variables.module.scss'

export default async function Navbar() {
    const session=await getServerSession(OPTIONS)
    console.log(session)
   
  return (
    <div className={`${variables.title}`}>
      {session ? 
         <div className='flex flex-row justify-between gap-4 px-3 py-2'>
         <div className='flex flex-row  gap-3'>
    <Link href='/'>Home</Link>
    <Link href='/createPrompt'>add post</Link>
    {session.user.role === 'admin' &&(<>
    <Link href='/showusers'>users</Link>
    <Link href='/createUser'>add user</Link>
    </> )
  }
    </div>
    <div className='px-3'>
    <Link href='/api/auth/signout'>signout</Link>
     </div>
    </div>

      : <>
    <Link href='/api/auth/signin' className='p-3'>signin</Link>
   
    </>
}
    
   </div>

  )
}
