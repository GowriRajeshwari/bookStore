const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderDetails.js");
const authorize = require("../middleware/jwt.js");

router.get("/order/:_id", authorize.verify, orderController.getOrder);

module.exports = router;
