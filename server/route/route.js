const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/admin.js");
router.post("/addBook", usercontroller.addBook);
router.get("/getAllBook", usercontroller.getAllBook);

module.exports = router;
