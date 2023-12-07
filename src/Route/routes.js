var router= require('express').Router() 
// const express =require('express');
// const router =express.Router();
 const AuthController = require('../Contoller/AuthController');

//  router.post("/register", AuthController.userregister);
 router.post("/login", AuthController.login);
 router.post("/forgetpassword", AuthController.forgetpassword);
 router.post("/resetpassword", AuthController.resetPassword);
 router.post("/sentotp", AuthController.sendotp);
 router.post("/verifyotp", AuthController.verifyotp);
//  router.post("/registration", AuthController.registration);


module.exports= router;