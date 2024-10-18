import mongoose from "mongoose";
export const monConncetion=async()=>{
    try{
      await mongoose.connect(process.env.mongodb_uri)
      console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
}