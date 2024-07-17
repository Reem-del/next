
import Promptcard from '@/components/promptcard'


async function fetchUserData(id){
  const res=await fetch(`http:localhost:3000/api/users/${id}/posts`)
  return res.json()
}


export default async function page({params}) {
  const posts=await fetchUserData(params.id)
  
    
  return (
    <div className='m-3'>
        {posts.map(p=><Promptcard post={p}  />)}

    </div>
  )
}
