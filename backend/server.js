import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import AuthRouter from "./Routes/authRoutes.js"
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import {Server} from "socket.io";
import jwt from "jsonwebtoken";
import userModel from "./Models/db.js";
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
});

server.listen(5000, () => {
    console.log("Server is running on port 5000");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});