import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export const POST=async(request)=>{
    const {userId,title,prompt}=await request.json()
    try{
        await connectDB()
        const newPrompt=new Prompt({creator:userId,prompt,title})
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt),{status:200})
}
catch(error){
    return new Response('failed to create new prompt',{status:500})
}
}
