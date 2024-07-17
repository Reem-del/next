'use client'
import React from 'react'


export default function UserForm({userInfo,setUserInfo,HandleSubmit,type}) {
   
    return (
        <div>
        <form className='form' onSubmit={HandleSubmit} >
        <label htmlFor='userName' className='lab'>UserName</label>
        <input type='text' value={userInfo.username} onChange={(e)=>setUserInfo({...userInfo,username:e.target.value})} placeholder='enter your name' className='inp' />
        <label htmlFor='email'  className='lab'>Email</label>
        <input type='text' value={userInfo.email} onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})} placeholder='enter your email' className='inp' />
        <label htmlFor='password'  className='lab'>password</label>
        <input type='password' value={userInfo.password} onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})} placeholder='enter your password' className='inp'/>
        <label className='lab'>Select User Role   </label>
        <select onChange={(e)=>setUserInfo({...userInfo,role:e.target.value})}>
        <option></option>
        <option value='admin' className='text-slate-500'>Admin</option>
        <option value='user' className='text-slate-500'>User</option>
        </select>
       
        <button className='text-lg text-yellow-200 w-32 h-12 hover:border border-yellow-200 rounded-lg'>{type}</button>


        </form>
        
        </div>
    )
}
