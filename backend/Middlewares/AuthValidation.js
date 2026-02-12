import Joi from "joi";

const signupValidation=(req,res,next)=>{
    console.log("Incoming signup data",req.body);
    const { name, email, password } = req.body;

  if (!name || name.trim().length < 3) {
    return res.status(400).json({ message: "Name must be at least 3 characters" });
  }

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

  next();
}
export default signupValidation;
