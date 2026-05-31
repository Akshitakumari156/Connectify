const mongoose = require("mongoose");
const { sendMail } = require("../utils/sendMail");
const { otpEmailTemplate } = require("../templates/otpEmailTemplate");

const otpSchema = new mongoose.Schema({
    otp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:5*60,
    }
});

const sendOtp = async(email,otp)=>{
    await sendMail(email,"for otp verfication",otpEmailTemplate(otp))
}

otpSchema.pre("save",async function(next){
try {
        await sendOtp(this.email, this.otp);
        next();
    } catch (error) {
        console.error("Mail sending failed but continuing DB save:", error);
        next(); // Mail fail hone par bhi next() call karein taaki request freeze na ho
    }
});

module.exports = mongoose.model("OTP",otpSchema);


