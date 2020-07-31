const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/admin.js");
router.post("/addBook", usercontroller.addBook);
router.get("/getAllBook", usercontroller.getAllBook);
router.put("/updateBook/:_id", usercontroller.updateBook);
module.exports = router;
