const express = require("express");
const router = express.Router();
const orderController = require("../controller/order.js");
const authorize = require("../middleware/jwt.js");

router.post("/order", authorize.verify, orderController.addOrder);

module.exports = router;
