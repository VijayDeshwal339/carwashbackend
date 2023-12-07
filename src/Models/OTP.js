const mongoose = require("mongoose");
const OTPSchema = new mongoose.Schema(
    {
        otp: {
            type: Number,
            default:"",
        },
        email: {
            type: String,
            default: "",
            require: true,
        },
        status: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
)
 const OTPModel = mongoose.model("OTP", OTPSchema);
 module.exports=OTPModel;