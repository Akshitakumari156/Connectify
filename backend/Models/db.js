import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  SocketId: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String, default: "" }
});

const MessageSchema=new Schema({
  sender:{
    type: mongoose.Schema.Types.ObjectId,ref:"User",required:true
  },
  receiver:{
    type: mongoose.Schema.Types.ObjectId,ref:"User",required:true
  },
  text:{
    type:String,required:true
  }
},
  {timestamps:true}
);

const userModel = mongoose.model("User", UserSchema);
const messageModel=mongoose.model("Message",MessageSchema);
export {userModel,messageModel};