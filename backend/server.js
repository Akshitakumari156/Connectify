require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/mongoDbConnection");
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute");
const productRoutes = require("./routes/productRoute");
const aiRoutes = require("./routes/aiRoute");
const chatRoute = require("./routes/chatRoute");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { app, server } = require("./socket/socket");


const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "*", 
    credentials: true
}));
app.use(express.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// mount route
app.use("/api/v1",userRoutes);
app.use("/api/v1",categoryRoutes);
app.use("/api/v1",productRoutes);
app.use("/api/v1",aiRoutes);
app.use("/api/v1",chatRoute);


dbConnect();

server.listen(PORT,()=>{
console.log(`Server is successfully running at port number ${PORT}`);
});