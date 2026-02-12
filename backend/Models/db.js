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

const userModel = mongoose.model("User", UserSchema);

export default userModel;
