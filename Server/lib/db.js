import mongoose from "mongoose";

export const connectDB= async()=>{
 try{
    mongoose.connection.on('connected',()=>{
          console.log("database connected");
    })
      mongoose.connect(`${process.env.MONGODB_URL}`)
 }
 catch(error){
  console.log(error)
 }
}