import User from "@/models/user";
import { connectDB } from "@/utils/database";
import bcrypt from "bcryptjs";


export async function GET(){
    try{
    connectDB()
   const data=await User.find()
    return new Response(JSON.stringify(data),{status:200})
    }
    catch(error){
        console.log(error)
    }
}

export const POST=async(request)=>{
    const {username,email,password,role}=await request.json()
    await connectDB()
    try{
        if(!username || !email || !password){
            return new Response("all fiels are required",{status:400})
        }
        const existUser=await User.findOne({email})
        if (existUser){
        return new Response('user is existed',{status:409}) 
        }
        
       const newUser=new User({username,email,role,password})
        await newUser.save()
        return new Response(JSON.stringify(newUser),{status:200})
    }
    catch (error){
        return new Response('failed to save user',{status:500})
    }
}


export const DELETE=async(request)=>{
    const id=request.nextUrl.searchParams.get('id')
    try{
    await connectDB()
       await User.findByIdAndDelete(id)
       return new Response ('deleted successfully',{status:200})
    }
    catch(error){
       return new Response ('failed to delete User',{status:500})
    }
    }
    export const PATCH=async(request)=>{
      
        const {id,username,email,role,password}=await request.json()
        
        try{
          await connectDB()
           const existUser=await User.findById(id)
           if(!existUser) {return new Response('no user found',{status:400})
           }
        existUser.username=username || existUser.username
        existUser.email=email || existUser.email
        existUser.role=role || existUser.role
        existUser.password=password || existUser.password
        await existUser.save()
        console.log(existUser)
        return new Response('successfully updated',{status:200})
        }
        catch(error){
           return new Response ('failed to updateUser',{status:500})
        }
     }
     
     
 