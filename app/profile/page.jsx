
import { getServerSession } from 'next-auth/next'
import {OPTIONS} from '../api/auth/[...nextauth]/route'
import Promptcard from '@/components/promptcard'

async function getData(id){
  try{
    const res=await fetch(`http://localhost:3000/api/users/${id}/posts`,{
      cache:'no-cache'
    })
    return res.json()
  }
  catch(error){
    console.log(error)
  }
}



export default async function MyProfile() {
  const session=await getServerSession(OPTIONS)
  console.log('session',session)
  const id=session.user.id
  const posts=await getData(id)
 console.log('profilePost',posts)

 
 
  return (
    <div className=' flex flex-col gap-3 m-4'>
    {posts.map(p=>
    <Promptcard post={p} />
    )}
    
    </div>
  )
}
