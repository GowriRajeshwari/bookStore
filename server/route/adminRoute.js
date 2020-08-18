const express = require("express");
const router = express.Router();
const admincontroller = require("../controller/admin.js");
const authorize = require("../middleware/jwt.js");
const upload = require("../services/imageUpload");
const singleUpload = upload.single("image");
router.post(
  "/books",
  authorize.authorize,
  upload.single("image"),
  admincontroller.addBook
);
router.get("/books", authorize.authorize, admincontroller.getAllBook);
router.put("/books/:_id", authorize.authorize, admincontroller.updateBook);
router.delete("/books/:_id", authorize.authorize, admincontroller.deleteBook);
router.get("/books/:query", authorize.authorize, admincontroller.searchBook);

module.exports = router;
