import { genrateToken } from "../lib/utiles.js";
import User from "../models/User.js";
  import bcrypt from "brcypt.js"
// sighnup ke liye 
export const signup= async(req, res)=>{
    const{fullName,email,password,bio}=req.body;
    try{
         // any data is missing
        if(!fullName || !email ||!password ||!bio ){
         return res.json({success:false,message:"missing deatils"})
        }
         const user= await User.findOne({email});
         // user exist hai already
         if(user){
             return res.json({success:"false",message:"user is already exist"})
         }

         const salt=await bcrypt.genSalt(10);
         const hashedPassword=await bcrypt.hash(password,salt);

         const newUser=await User.create({
             fullName,email,password:hashedPassword,bio
         })
         const token= genrateToken(newUser._id)
  res.json({success:true ,userData:newUser,token,message:"Account create is succesfully"})
    }
    catch(error){
      res.json({success:false ,message:"Account Not create  succesfully"})
      console.log(error.message)
 
    }

}