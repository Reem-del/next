import React from 'react'

function Form({post,setPost,handleSubmit,submitting,type}) {
    return (

        <form onSubmit={handleSubmit} className='form gap-5 '>
        <label htmlFor='title' className='lab'>Post Title </label>
        <input
        className='px-2 w-64 h-9 rounded-lg'
        type='text'
        value={post.title}
        onChange={(e)=>setPost({...post,title:e.target.value})}
        placeholder='title'
        required
        autoComplete='off'
        />
       
        <label htmlFor='prompt' className='lab'>Post Describe</label>
        <textarea
        className='px-2 w-64 h-32 rounded-lg'
        value={post.prompt}
        onChange={(e)=>setPost({...post,prompt:e.target.value})}
        placeholder='write your post here'
        required
        />
       
       
        <button disabled={submitting} className='text-yellow-200 m-3 text-lg'>{submitting ? `${type}ing` : type }</button>
        </form>  
        
    )
}

export default Form
