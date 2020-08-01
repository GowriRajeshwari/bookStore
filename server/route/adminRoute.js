const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/admin.js");
const Role = require("../middleware/role.js");
const authorize = require("../middleware/jwt.js");

router.post("/books", authorize(Role.Admin), usercontroller.addBook);
router.get("/books", usercontroller.getAllBook);
router.put("/update/:_id", usercontroller.updateBook);
router.delete("/delete/:_id", usercontroller.deleteBook);
module.exports = router;
