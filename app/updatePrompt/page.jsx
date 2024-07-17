'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import Form from '@/components/form'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function UpdatePrompt() {
    const router=useRouter()
    const [post,setPost]=useState({prompt:"",title:""})
    const [submitting,setSubmitting]=useState(false)
    const searchParams=useSearchParams()
    const promptId=searchParams.get('promptId')
    console.log('promptid',promptId)
    
   async function getUserData(){
    const res=await fetch(`/api/prompt/${promptId}`)
   const data=await res.json()
   console.log('update',data)
   setPost({prompt:data.prompt,title:data.title})
    }
    useEffect(()=>getUserData,[promptId])
    async function updatePrompt(e){
        e.preventDefault()
        setSubmitting(true)

        try
        {const response=await fetch(`/api/prompt/${promptId}`,{
            method:"PATCH",
            body:JSON.stringify({
                prompt:post.prompt,
                title:post.title
            })
        })
        if (response.ok){
            toast.success('prompt updated successfully')
            setSubmitting(false)
            router.push('/')
        }
    
    }
        catch(error){
            console.log(error)
        }
        finally{setSubmitting(false)}
    }
  return (
    
        <div classNmae='relative '>
        <div className='absolute left-[50%] top-[50%] w-[400px] -translate-x-[50%] -translate-y-[50%] brightness-75 border border-red-200 rounded-lg'>
         <Form post={post} setPost={setPost} handleSubmit={updatePrompt} type='UPDATE' submitting={submitting}/>
    </div>
    </div>
  )
}
