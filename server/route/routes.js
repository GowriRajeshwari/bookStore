const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/userController.js");
//calling the POST method for creating a new user
router.post("/bookstore/users/register", usercontroller.registerUser);

module.exports = router;
