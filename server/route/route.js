const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/admin.js");
router.post("/addBook", usercontroller.addBook);
module.exports = router;
