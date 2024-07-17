'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
import TagColor from "./tagColor"
import { CiMenuKebab } from "react-icons/ci";
import { MdDeleteSweep ,MdModeEditOutline } from "react-icons/md";
import variables from '../styles/variables.module.scss'


export default function Promptcard({post}) {
  const {data :session}=useSession()
  const router=useRouter()
    const pathName=usePathname()

    async function HandleDelete(id){
      try
     { const res=await fetch(`http://localhost:3000/api/prompt/${id}`,{
        method:'DELETE'
      })
      if(res.ok){
        console.log(res)
        router.refresh()
      }
     }
     catch(error){
      console.log(error)
     }
    }
     function HandleEdit(id){
      router.push(`/updatePrompt?promptId=${id}`)
     
    }
    

    return (
        <>
        
        <div className={`${variables.divcar} flex flex-col border border-slate-400 rounded-lg pl-2  p-2`}>
          <div className='flex flex-row justify-between' >
          <div className='fl' >      
          <div className={`w-9 h-9 rounded-full text-center ${TagColor(post.tag)}`} >
          <div className="tooltip" data-tip={post.creator.username}>
            <Link href={`${session?.user.id === post?.creator?._id ? `/profile` : `profile/${post?.creator?._id}`}`} >
          {post.tag}
           </Link>
           </div>
           </div>

          
          <p className="font-mono  font-bold">{post?.title}</p>
          </div>
         
         
          {((session?.user.id === post?.creator?._id && pathName === '/profile') || session?.user?.role === 'admin') &&
    
            <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">     
  <CiMenuKebab /></div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
    <li><a><MdDeleteSweep  onClick={()=>HandleDelete(post._id)}  /></a></li>
    <li><a><MdModeEditOutline  onClick={()=>HandleEdit(post._id)}/></a></li>
  </ul>
</div>
             
         
         
          }
           </div>
          
          <p className="pl-9">{post.prompt}</p>
          <p className="font-mono text-slate-400 mt-4">{new Date(post.createdAt).toLocaleDateString('en-US',{
            day:'numeric',
            month:'long',
            year:'numeric',
            hour:"2-digit",
            minute:"2-digit",

          })}</p>
          
     
        </div>
        
        </>
    
    
    )
}
/*
<button onClick={()=>HandleDelete(post._id) }>Delete</button>
          <button onClick={()=>HandleEdit(post._id)}>Edit</button>*/