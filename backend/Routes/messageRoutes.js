import express from "express";
import cors from "cors";
import { messageModel } from "../Models/db.js";
import { signupValidation, authMiddleware } from "../Middlewares/AuthValidation.js";
const router = express.Router();

router.get("/:userId",authMiddleware,async(req,res)=>{
   console.log(req.user);
   const myId=req.user.id;
   const otherId=req.params.userId;
   const messages=await messageModel.find({
      $or:[
         {sender:myId,receiver:otherId},
         {sender:otherId,receiver:myId}
      ]
   }).sort({createdAt:1});
   res.json(messages);
});

export default router;