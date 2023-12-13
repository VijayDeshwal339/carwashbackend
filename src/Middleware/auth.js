const jwt = require("jsonwebtoken");
const UserModel = require("../Models/User");
const ChangeUserAuth = asyn (req,res,next) => {
    try{
        console.log("test");
        const { token } = req.cookies;
        if (!token) {
            res
            .status(401)
            .send({ status:"Failed" , message: "unauthorized user,no token" });
        }
        const data = jwt.verify(token, process.env.JWT_SECRETE_KEY);
        console.log(data);
        req.user = await UserModel.findById(data.userId);
        console.log("user", req.user);
        next();
    } catch (err) {
        res.status(500).send({err});
    }
};
module.exports=ChangeUserAuth;