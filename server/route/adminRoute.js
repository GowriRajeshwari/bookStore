const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/admin.js");
const authorize = require("../middleware/jwt.js");

router.post("/books", authorize.authorize, usercontroller.addBook);
router.get("/books", usercontroller.getAllBook);
router.put("/books/:_id", usercontroller.updateBook);
router.delete("/books/:_id", usercontroller.deleteBook);
module.exports = router;
