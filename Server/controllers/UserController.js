import { genrateToken } from "../lib/utiles.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

  import cloudinary from "../lib/cloudinary.js";
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
             return res.json({success:false,message:"user is already exist"})
         }

         const salt= await bcrypt.genSalt(10);
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


//controller to login
export const login= async(rer,res)=>{
  try{
    const{email,password,}=req.body;
    const userData=  await User.findOne({email})
      

    const isPasswordCorrect=await bcrypt.compare(password,userData.password);

    if(!isPasswordCorrect){
      return res.json({ success:false,message:"Invalid credentials"});
    }

     
         const token= genrateToken(newUser._id)
  res.json({success:true ,userData,token,message:"login succesfully"})
    


  }
  catch(error){
res.json({success:false ,message:"Account Not Login succesfully"})
      console.log(error.message)
 
  }

}


// controller to chek if user is authenticated

export  const checkAuth = (req,res)=>{
  res.json({success:true,user:req.user});
}



// contoller to update user profile details


export const updateprofile= async(req,res)=>{
    
  try{
    
    const {profilePic,bio,fullName}=req.body;

    const userId=req.user._id;

    let updatedUser;
     if(!profilePic){
        updatedUser=await User.findByIdAndUpdate(userId,{bio,fullName},{new:true});
     }
     else{
      const upload= await cloudinary.uploader.upload(profilePic);
      updatedUser=await User.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true})
     }
     res.json({success:true,user:updatedUser})
  }
  catch(error){
res.json({success:false,message:error.message})
  }
}