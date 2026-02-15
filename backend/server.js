import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import AuthRouter from "./Routes/authRoutes.js"
import connectDB from "./Config/db.js";
import dotenv from "dotenv";
//import SocketIo from "socket.io";

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

// const io=new SocketIo.Server(server,{
//     cors:{
//         origin:"*",
//         methods:["GET","POST"],
//         credentials:true
//        }
// })
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});