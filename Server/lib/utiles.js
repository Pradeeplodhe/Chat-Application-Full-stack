import jwt from "jsonwebtoken";

export const genrateToken = ()=>{

    const token=jwt.sign(userId,process.env.JWT_SECRET)
    return token;
}