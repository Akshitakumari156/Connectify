import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import AuthRouter from "./Routes/authRoutes.js"
import connectDB from "./Config/db.js";

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter)


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});