const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/cart.js");
const Role = require("../middleware/role.js");
const authorize = require("../middleware/jwt.js");

router.post("/cart", authorize.authorize(), usercontroller.addCart);
router.get("/:_id", usercontroller.getAllCart);
module.exports = router;
