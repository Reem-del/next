'use client'
import UserForm from '@/components/userForm'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import React from 'react'

function UpdateUser() {
    const [userInfo,setUserInfo]=useState({username:'',email:'',password:'',role:''})
    const searchParams=useSearchParams()
    const router=useRouter()
    const id=searchParams.get("id")
    console.log(id)
    const HandleUpdate=async(e)=>{
        e.preventDefault()
       const res= await fetch('http://localhost:3000/api/users',{
            method:"PATCH",
            body:JSON.stringify({id,
                username:userInfo.username,
                email:userInfo.email,
                password:userInfo.password,
                role:userInfo.role
            })
        }

        )
        if(res.ok){
            console.log('successfully updated')
            router.push('/showusers')
        }
    }
    return (
       
             <div classNmae='relative '>
             <div className='absolute left-[50%] top-[50%] w-[400px] -translate-x-[50%] -translate-y-[50%] brightness-75 border border-red-200 rounded-lg'>
      <UserForm HandleSubmit={HandleUpdate} userInfo={userInfo} setUserInfo={setUserInfo} type='update' />
        </div>
        </div>
    )
}

export default  UpdateUser
