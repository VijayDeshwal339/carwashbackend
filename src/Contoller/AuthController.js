const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const OTPModel = require("../Models/OTP");
const jwt = require("jsonwebtoken");

class AuthController {
  static sendotp = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await OTPModel.findOne({ email: email });
      if (user) {
        res.status(500).json({
          success: true,
          message: "User already registered!...",
        });
      }
      
      else {
      const otp = Math.floor(100000 + Math.random() * 900000);

      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user:'Deshwalamit339@gmail.com',
          pass:"nuzu karl vsaz qeio"
        },
      });

      // Send OTP email
      const info = await transporter.sendMail({
        from: 'Deshwalamit339@gmail.com', // Update with your name and email
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is: ${otp}`,
        html: `<b>Your OTP for email verification is: ${otp}</b>`,
      });

      // Save OTP in MongoDB
      const otpRecord = new OTPModel({
        email: email,
        otp: otp.toString(), // Convert OTP to string before saving
      });

    
      await otpRecord.save();
    
      res.status(200).json({ success: true, message: "Success", otpRecord });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
  static verifyotp = async (req, res) => {
    try {
      const {
        email,
        otp,
        firstname,
        lastname,
        password,
        mobilenumber,
        alternateNumber,
        address,
      } = req.body;
      
      const user1 = await UserModel.findOne({ email: email });
      if (user1) {
        res.status(400).json({
          success: false,
          message: "User already registered!....",
        });
        return;
      }

      // Find the user with the given email and OTP
      // const user = await OTPModel.findOne({ email: email, otp: otp });
      const user = await OTPModel.findOne({ email: email }).maxTimeMS(10000);
      console.log("user", user);

      if (!user) {
        res.status(400).json({
          success: false,
          message: "Invalid OTP. Please check your email.",
        });
        return;
      }
      const hashPassword = await bcrypt.hash(password, 10);

      // Check if OTP is expired (2 minutes duration)

      // If OTP is valid, create a new user in your main user collection with additional details
      const newUser = new UserModel({
        email: email,
        otp: otp,
        firstname: firstname,
        lastname: lastname,
        password: hashPassword,
        mobilenumber: mobilenumber,
        alternateNumber: alternateNumber,
        address: address,
      });
      // const newUser = await UserModel.create(d);

      await newUser.save();

      // Optionally, you can remove the OTP record from the OTPModel collection
      // await OTPModel.deleteOne({ email: email, otp: otp });

      res.status(200).json({
        success: true,
        message: "User registered successfully!",
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" ,error});
    }
  };
  // ---------------------------------- forgot password---------------------------------------------------------//
  static forgetpassword = async (req, res) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const user = await UserModel.findOneAndUpdate(
        { email },
        { otp },
        { new: true, upsert: true }
      );
      var transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'Deshwalamit339@gmail.com',
            pass: "nuzu karl vsaz qeio",
        },
      });
      const info = await transport.sendMail({
        from: '"Your Name" <jooligupta2000@gmail.com>', // Update with your name and email
        to: email,
        subject: "Email Verification OTP",
        text: `Your OTP for email verification is: ${otp}`,
        html: `<b>Your OTP for email verification is: ${otp}</b>`,
      });
      transport.sendMail(info, (err, result) => {
        if (err) {
          console.log("Error");
        }
      });
      res.status(200).json({
        message: "OTP sent successfully. Check your email for OTP.",
        otp: otp,
        email: email,
        userId: user._id,
      });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };

  //-------------------------------------------------- resetPassword -------------------------------------------//
  static resetPassword = async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;
      const user = await UserModel.findOne({ email: email, otp });
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.otp = null;
      
      let x = await user.save();
      console.log(x),
        res
          .status(200)
          .json({ success: true, message: "Password reset successful" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" + err });
    }
  };

  //------------------------------------------- login -----------------------------------------------------//
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      try {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatched = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatched) {
            // Generate a JWT token
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              "your_secret_key",
              { expiresIn: "1h" }
            );

            res.status(200).json({
              message: "Congratulations! User successfully logged in.",
              user,
              token,
            });
          } else {
            res
              .status(500)
              .json({ message: "Email and password do not match" });
          }
        } else {
          res.status(500).json({ message: "You are not a registered user" });
        }
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
      res.status(500).json({ message: "All fields are required" });
    }
  };
}
module.exports = AuthController;



// user:'Deshwalamit339@gmail.com',
// pass:"nuzu karl vsaz qeio"