import express from "express";
import cors from "cors";
import { userModel } from "../Models/db.js";
import { authMiddleware } from "../Middlewares/AuthValidation.js";
const router = express.Router();
router.get("/search", authMiddleware, async (req, res) => {
  const q = req.query.q || "";
  const users = await userModel.find({
    name: { $regex: q, $options: "i" },
    _id: { $ne: req.user.id }, // don’t show yourself
  }).select("_id name");

  res.json(users);
});

export default router;