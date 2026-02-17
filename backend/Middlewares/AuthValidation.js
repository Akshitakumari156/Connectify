import Joi from "joi";
import jwt from "jsonwebtoken";

const signupValidation = (req, res, next) => {
  console.log("Incoming signup data", req.body);
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
};

const authMiddleware = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "No token" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export { authMiddleware, signupValidation };