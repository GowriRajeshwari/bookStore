const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController.js");
//calling the POST method for creating a new user
router.post("/bookstore/users/register", usercontroller.registerUser);
//calling the POST method for login
router.post("/bookstore/users/login", usercontroller.loginUser);

module.exports = router;
