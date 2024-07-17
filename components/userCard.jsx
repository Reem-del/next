'use client'
import { useRouter } from "next/navigation"
import { MdDeleteSweep ,MdModeEditOutline } from "react-icons/md";


function UserCard({users}) {
const router=useRouter()
    const HandleDelete=async(id)=>{
        const res=await fetch(`http://localhost:3000/api/users?id=${id}`,{
            method:'DELETE'
        })
      if(res.ok){
        console.log('successful deleted')
        router.refresh()
    
      }
    }

    function HandleEdit(id){
        router.push(`/updateUser?id=${id}`)
    }
    return (
        <div>
      <div className="overflow-x-auto ">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="text-slate-300 text-[15px]">
        <th>UserName</th>
        <th>Email</th>
        <th>Role</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {users.map(user=>(
<tr key={user._id} className="bg-base-200 hover:bg-slate-200 border border-slate-200">
<td>{user.username}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td className='cursor-pointer' onClick={()=>HandleDelete(user._id)}><MdDeleteSweep /></td>
<td className='cursor-pointer' onClick={()=>HandleEdit(user._id)}><MdModeEditOutline /></td>
</tr>)
)}

     
    </tbody>
  </table>
</div>
       
            
        </div>
    )
}

export default UserCard
/*
<table >
<thead>
<tr>
<th>username</th>
<th>email</th>
<th>role</th>
<th>remove</th>
<th>Edit</th>
</tr>
</thead>
<tbody>
{users.map(user=>(
<tr key={user._id}>
<td>{user.username}</td>
<td>{user.email}</td>
<td>{user.role}</td>
<td className='cursor-pointer' onClick={()=>HandleDelete(user._id)}>remove</td>
<td className='cursor-pointer' onClick={()=>HandleEdit(user._id)}>EDIT</td>
</tr>)
)}
</tbody>

</table>
*/