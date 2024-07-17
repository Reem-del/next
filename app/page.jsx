import Feed from "@/components/Feed"
import { getServerSession } from 'next-auth/next'
import { OPTIONS } from "./api/auth/[...nextauth]/route"

async function fetchData(){
try{
  const res=await fetch('http://localhost:3000/api/prompt',{
    cache:'no-store'
  })
   return res.json()
 }
 catch(error){
  console.log(error)
 }
}



export default async function Home() {
  const session=await getServerSession(OPTIONS)
  const posts=await fetchData()
  console.log('posts',posts)
  

  
  return (
    <div  >
    {session  ? 
    <Feed  allpost={posts} /> :
    <p className='text-slate-200 p-3'>no session existed</p>
   }
    </div>
  )
}
