import { Schema,model,models } from "mongoose";
const {hash} =require('bcryptjs')


const UserSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
       
    },
    role:{
        type:String,
        default:"user"
       
    },
    
    })
    UserSchema.pre('save',async function(next){
            if(this.isModified("password")){
            this.password=await hash(this.password,10)
        return next()
    }
    return next();
        
    })
   
    const User=models.User || model('User',UserSchema)

    export default User