import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import AuthRouter from "./Routes/authRoutes.js"
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import {userModel} from "./Models/db.js";
import{ messageModel} from "./Models/db.js";
import messageRoutes from "./Routes/messageRoutes.js";
import userRouter from "./Routes/userRouter.js";
dotenv.config();

connectDB();
const app = express();

const server=http.createServer(app);

app.use(cors({
  origin: "http://localhost:5173", // your frontend
  credentials: true,
}));
app.use(express.json());
app.use("/auth", AuthRouter)
app.use("/messages",messageRoutes)
app.use("/users",userRouter);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"],
        credentials:true
       }
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("No token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;

    await userModel.findByIdAndUpdate(decoded.id, {
      SocketId: socket.id
    });

    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
});

io.on("connect", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", async () => {
    await userModel.findByIdAndUpdate(socket.userId, {
      SocketId: ""
    });
    console.log("User disconnected:", socket.userId);
  });
  
  socket.on("private_message",async({receiverId,text})=>{
     console.log("ReceiverId:", receiverId, "Text:", text);
    try{
      const message=await messageModel.create({
        sender:socket.userId,
        receiver:receiverId,
        text:text
      });
      const receiver=await userModel.findById(receiverId);
      if(receiver?.SocketId){
        io.to(receiver.SocketId).emit("private_message",{
          _id:message._id,
          sender:socket.userId,
          receiver:receiverId,
          text:text,
          createdAt:message.createdAt,
        });
      }
      socket.emit("private_message",{
        _id:message._id,
        sender:socket.userId,
        receiver:receiverId,
        text:text,
        createdAt:message.createdAt
      })
    }catch(error){
      console.error("Error sending message:", error);
    }
  })
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});