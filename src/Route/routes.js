const express = require("express");
const router = express.Router();
const AuthController = require('../Contoller/AuthController');
const {ChangeUserAuth} = require("../Middleware/auth");
const UserController = require("../Contoller/UserController")

// User
 router.post("/login", AuthController.login);
 router.post("/forgetpassword", AuthController.forgetpassword);
 router.post("/resetpassword", AuthController.resetPassword);
 router.post("/sentotp", AuthController.sendotp);
 router.post("/verifyotp", AuthController.verifyotp);

// Supervisior
router.post("/create-supervisior",UserController.createsupervisior);
router.get("/get-allsupervisior",ChangeUserAuth,UserController.getsupervisior);
router.get("/getsupervisiorbyid/:id", UserController.getsinglesupervisior);
router.post("/edit-user/:id", UserController.edituser);
router.delete("/delete/:id", UserController.deleteUser);


module.exports= router;