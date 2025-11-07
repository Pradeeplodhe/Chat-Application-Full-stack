// import express from "express";
// import "dotenv/config";
// import cors from "cors"
// import http from "http"
// import { connectDB } from "./lib/db.js";
// import userRouter from "./routes/userRoutes.js";
// import messageRouter from "./routes/messageRoutes.js";
//  import {Server} from "socket.io"
// import { Socket } from "dgram";



//  // craete express app and http server
// const app=express();
// const server = http.createServer(app);

// // initalize sokect.io server
// export const io = new Server( server,{
//    cors:{origin:"*"}
// } )

// // store online users

// export const userSocketMap = {}   



// io.on("connection",(socket)=>{
//     // const userId=socket.handshake.query.userId;
//     const userId = socket.handshake.auth?.userId; // query → auth

//     console.log("user connected",userId);



//     if(userId)userSocketMap[userId]=socket.id;


//     //emit online  users to all connected
//     io.emit("getOnlineUsers",Object.keys(userSocketMap));

//     socket.on( "disconnect", ()=>{
//        console.log("user Disconnected ",userId)
       
//        delete userSocketMap[userId];
//        io.emit("getOnlineUsers",Object.keys(userSocketMap))

//     })
// })

//   // middleware setup
// app.use(express.json({limit:"4mb"}));
// app.use(cors());


//  // routes setup
// app.use("/api/status",(req,res)=>{
//     res.send("server is started")
// })
// app.use("/api/auth",userRouter);
// app.use("/api/messages",messageRouter)

// //connected to mongodb
//   await connectDB();

// const port=process.env.PORT||5000;
// server.listen(port,()=>{
//      console.log(`server is running at ${port}`);
// })





import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, { cors: { origin: "*" } });
export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;
  console.log("User connected:", userId);
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User disconnected:", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));
app.use(cors());

app.use("/api/status", (req, res) => res.send("Server is running"));
app.use("/api/auth", userRouter,()=>{
  console.log("/api/auth")
});
app.use("/api/messages", messageRouter);

await connectDB();

const port = process.env.PORT || 7000;
server.listen(port, () => console.log(`Server running at ${port}`));
