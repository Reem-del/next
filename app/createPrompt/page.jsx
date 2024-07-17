'use client'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import {  useState } from "react"
import Form from "@/components/form"
import toast from 'react-hot-toast'

export const metadata = {
    title: "create new  prompt",
    description: "Generated by create next app",
  };
function CreatePrompt() {
    const [post,setPost]=useState({prompt:'',title:''})
    const [submitting,setSubmitting]=useState(false)
    const {data : session}=useSession()
    const router=useRouter()

    const createPrompt=async(e)=>{
        e.preventDefault()
        setSubmitting(true)
        try{
            const response=await fetch("/api/prompt/new",{
            method:'POST',
            body:JSON.stringify({
                prompt:post.prompt,
                userId:session?.user.id,
                title:post.title
            })
            
            }
          
            
            )
            if(response.ok){
                toast.success('created Successfully')
                router.push("/")}
        }
            catch(error)
            {console.log(error)}
            finally{
                setSubmitting(false)
            }
            console.log('response'.response)
        
        }
  
    return (
        <div classNmae='relative '>
            <div className='absolute left-[50%] top-[50%] w-[400px] -translate-x-[50%] -translate-y-[50%] brightness-75 border border-red-200 rounded-lg'>
        <Form
        type="CREATE"
        post={post} 
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
        />
        </div>
        </div>
        
    )
}

export default CreatePrompt