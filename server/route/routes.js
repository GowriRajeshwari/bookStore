const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/controller.js");
router.post("/addBook", usercontroller.registerUser);
module.exports = router;
