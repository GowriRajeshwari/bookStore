const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/controller.js");
const tokenVerify = require("../middleware/jwt.js");
//calling the POST method for creating a new user
router.post("/register", usercontroller.registerUser);
//calling the POST method for login
router.post("/login", usercontroller.loginUser);

//forgot password
router.post("/forgotpassword", usercontroller.forgotPassword);

//reset Password
router.post("/resetpassword", tokenVerify.auth, usercontroller.resetPassword);
module.exports = router;
