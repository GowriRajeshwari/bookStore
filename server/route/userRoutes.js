const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/user.js");
const tokenVerify = require("../middleware/jwt.js");
router.post("/register", usercontroller.registerUser);
router.post("/login", usercontroller.loginUser);
router.post("/forgotpassword", usercontroller.forgotPassword);
router.post("/resetpassword", tokenVerify.auth, usercontroller.resetPassword);
module.exports = router;
