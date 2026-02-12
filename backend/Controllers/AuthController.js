import bcrypt from "bcryptjs"
import crypto from "crypto"
import userModel from "../Models/db.js"
import jwt from "jsonwebtoken"
import sendEmail from "../Utils/sendEmail.js";

export const signup=async(req,res)=>{
    try{
        const { name, email, password } = req.body;
    const existingUser = await userModel.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const user = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });
    await sendEmail(user.email, verificationToken);
    res.status(201).json({
      message: "User registered successfully. Please verify your email.",
    });
    }catch(error){
       console.error(error);
       res.status(500).json({ message: "Server error" });
    }
}

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = "";

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
