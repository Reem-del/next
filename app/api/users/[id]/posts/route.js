import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";
import bcrypt from "bcryptjs";

export const GET=async(request,{params})=>{
 try{
    await connectDB()
    const Prompts=await Prompt.find({creator:params.id}).populate('creator')
    if(!Prompts) {return new Response('no prompts found',{status:400})
   }
   
   else{ return new Response(JSON.stringify(Prompts),{status:200})}
 }
 catch(error){
    return new Response ('failed to fetch prompt created by user',{status:500})
 }
}
export const PATCH=async(request,{params})=>{
   const {username,email,password,role}=await request.json()
   try{
      connectDB()
      const existUser=await User.findById(params.id)
      if(!existUser) {return new Response('no user found',{status:400})
      }
   existUser.username=username || existUser.username;
   existUser.email=email || existUser.email
   existUser.password=await bcrypt.hash(password,10) || existUser.password
   existUser.role=role
   await existUser.save()
       
   }
   catch(error){
      return new Response ('failed to updateUser',{status:500})
   }
}

export const DELETE=async(request,{params})=>{
   try{
   await connectDB()
      await User.findByIdAndDelete(params.id)
      return new Response ('deleted successfully',{status:200})
   }
   catch(error){
      return new Response ('failed to delete User',{status:500})
   }
   }
