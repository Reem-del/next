'use client'
import UserForm from '@/components/userForm'
import React from 'react'
import {  useState } from "react"
import { useRouter } from 'next/navigation'

function CreateUser() {
    const router=useRouter()
    const [user,setUser]=useState({username:'',email:'',password:'',role:''})

   async function HandleSubmit(e){
    e.preventDefault()
        const res=await fetch('/api/users',{
            method:'POST',
            body:JSON.stringify({
                username:user.username,
                email:user.email,
                password:user.password,
                role:user.role
            })
        })
        if(res.ok){
            router.push('/showusers')
        }
    }
    return (
        
            <div classNmae='relative '>
            <div className='absolute left-[50%] top-[50%] w-[400px] -translate-x-[50%] -translate-y-[50%] brightness-75 border border-red-200 rounded-lg'>
         <UserForm HandleSubmit={HandleSubmit} userInfo={user} setUserInfo={setUser} type='Create' />   
        </div>
         </div>
        
    )
}

export default CreateUser
