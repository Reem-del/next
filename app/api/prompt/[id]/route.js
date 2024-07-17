import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export const GET=async(request,{params})=>{
    await connectDB()
    try {
        const prompt=await Prompt.findById(params.id).populate('creator')
        return new Response(JSON.stringify(prompt),{status:200})
    }
    catch(error){
        return new Response('fail to fetch this prompt',{status:500})
    }

}
export const PATCH=async(request,{params})=>{
    const {prompt,title}=await request.json()
    try{
        await connectDB()
        const existPrompt=await Prompt.findById(params.id)
        if (!existPrompt) { return new Response('prompt not found',{status:404})}
        existPrompt.prompt=prompt
        existPrompt.title=title
        await existPrompt.save()
            return new Response('suuccessfully updated',{status:200})
    }
            catch(error){
                return new Response('failed to update prompt',{status:500})
            }

    }
    export const DELETE=async(request,{params})=>{
        try{
            await connectDB()
            await Prompt.findByIdAndDelete(params.id)
            return new Response('prompt removed successfuly',{status:200})
            
        }
                catch(error){
                    return new Response('failed to remove prompt',{status:500})
                }
    }
    

