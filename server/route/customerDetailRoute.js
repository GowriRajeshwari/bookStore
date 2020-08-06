const express = require("express");
const router = express.Router();
const customerDetail = require("../controller/customerDetail.js");
const authorize = require("../middleware/jwt.js");

router.post("/customerDetail", authorize.verify, customerDetail.addAddress);

module.exports = router;
