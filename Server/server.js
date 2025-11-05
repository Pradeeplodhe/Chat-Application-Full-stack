import express from "express";
import "dotenv/config";
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

const app=express();

const server = http.createServer(app);


  // middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());


 // routes setup
app.use("/api/status",(req,res)=>{
    res.send("server is started")
})
app.use("/api/auth",userRouter);
app.use("/api/messages",messageRouter)

//connected to mongodb
  await connectDB();

const port=process.env.PORT||5000;
server.listen(port,()=>{
     console.log(`server is running at ${port}`);
})