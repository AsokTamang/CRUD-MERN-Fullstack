import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

export const conDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log(`mongodb connection successful`)

    }
    catch(err){
       console.error(`The error is:${err}`)
       process.exit(1)

    }
}