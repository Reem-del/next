import { Schema ,model,models} from "mongoose";

const PromptSchema=new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String
    },
    prompt :{
        type:String,
        required:true
    },
    tag:{
        type:String,
     
    },
    
},
{timestamps:true}
)
PromptSchema.pre('save',async function(next){
    if(this.isModified){
        try{
            const user=await model('User').findById(this.creator);
            if(user){
                this.tag=user.username.slice(0,1).toUpperCase()
            }
        }
        catch(err){
            next(err)
        }
    }
    next()
})
const Prompt=models.Prompt || model('Prompt',PromptSchema)
export default Prompt