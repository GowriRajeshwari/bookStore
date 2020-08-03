const express = require("express");
const router = express.Router();
const usercontroller = require("../controller/cart.js");
const Role = require("../middleware/role.js");
const authorize = require("../middleware/jwt.js");

router.post("/cart/:_id", authorize.verify, usercontroller.addCart);
// router.get("/cart/:_id", authorize.verify, usercontroller.getCartbyBookId);
router.get("/cart", authorize.verify, usercontroller.getAllCart);

module.exports = router;
