import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://akshitak440_db_user:WxI6USky6j5Ru3bF@cluster0.alt893m.mongodb.net/auth-app"
    );
    console.log("Database Connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

export default connectDB;

//"mongodb+srv://akshitak440_db_user:WxI6USky6j5Ru3bF@cluster0.alt893m.mongodb.net/auth-app"