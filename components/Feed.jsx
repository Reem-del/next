'use client'
import { useState,useEffect } from "react"
//import { useSession } from "next-auth/react"
import Promptcard from "./promptcard"



export default function Feed({allpost}) {
    const [filteredPost,setFilteredPost]=useState([])
    const [searchValue,setsearchValue]=useState("")
   
    
    function HandleSearch(){
      const regexp=new RegExp(searchValue,'i')
      const result=allpost.filter(post=>regexp.test(post.prompt) || regexp.test(post.creator.username))

      //const result=allpost.filter(post=>post.creator.username.includes(searchValue) || post.prompt.includes(searchValue))
      setFilteredPost(result)
      console.log('filteredPost',filteredPost)
    }
    useEffect(()=>HandleSearch,[searchValue])

  return (
    <div className='h-full ' >
    <div className="flex flex-col gap-5 justify-center items-center "   >
      
      <input 
      type='text'
      value={searchValue}
      placeholder="Search"
      onChange={(e)=>setsearchValue(e.target.value)}
      className="border border-slate-400 rounded-lg w-56 mt-6 mb-3 pl-2 h-8"
      />
     
      {searchValue ? filteredPost.map((p)=>
        <Promptcard key={p._id} post={p} />)
      :
      allpost.map((p)=>
    <Promptcard  key={p._id} post={p} />)
  }
  </div>
  </div>
 
    
  )
     


}



