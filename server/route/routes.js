const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController.js");
const tokenVerify = require("../middleware/jwt.js");
//calling the POST method for creating a new user
router.post("/bookstore/users/register", usercontroller.registerUser);
//calling the POST method for login
router.post("/bookstore/users/login", usercontroller.loginUser);

//forgot password
router.post("/bookstore/users/forgotpassword", usercontroller.forgotPassword);

//reset Password
router.post(
  "/bookstore/users/resetpassword",
  tokenVerify.auth,
  usercontroller.resetPassword
);
module.exports = router;
