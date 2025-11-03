import express from "express";
import "dotenv/config";
import cors from "cors"
import http from "http"
import { connectDB } from "./lib/db.js";


const app=express();

const server = http.createServer(app);


  // middleware setup
app.use(express.json({limit:"4mb"}));
app.use(cors());

app.use("/api/status",(req,res)=>{
    res.send("server is started")
})

//connected to mongodb
  await connectDB();

const port=process.env.PORT||5000;
server.listen(port,()=>{
     console.log(`server is running at ${port}`);
})