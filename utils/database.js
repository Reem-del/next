import mongoose from "mongoose"

export const connectDB=async()=>{
    try{
await mongoose.connect(process.env.MONGODB_URL ,{
    dbName:'prompt',
})
console.log('mongodb connected')
    }
    catch(error){
        console.log(error)
    }
}

