import React from 'react'
import UserCard from '@/components/userCard'



const fetchUser=async()=>{
    const res=await fetch('http://localhost:3000/api/users',
    {cache:'no-store'})
    return res.json()
}
async function ShowUser() {
    
    const users=await fetchUser()
    console.log('users',users)

    return (
        <div  className='p-3'>
           {users && <UserCard users={users} />}
           
        </div>
    )
}

export default ShowUser
