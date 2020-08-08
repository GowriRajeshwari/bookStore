const dbConfig = require("./config/database.config");
const mongoose = require("mongoose");
const express = require("express");
const bodyparser = require("body-parser");
const expressvalidator = require("express-validator");
const app = express();
const userRoutes = require("./route/userRoutes.js");
const adminRoute = require("./route/adminRoute.js");
const cartRoute = require("./route/cartRoute.js");
const customerDetailRoute = require("./route/customerDetailRoute.js");
const orderRoute = require("./route/orderRoute.js");
const logger = require("./logger/logger.js");
require("dotenv").config();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressvalidator());
app.use("/", userRoutes);
app.use("/", adminRoute);
app.use("/", cartRoute);
app.use("/", customerDetailRoute);
app.use("/", orderRoute);
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.log("info", "Connected to the Database Successfully");
    app.listen(process.env.PORT, () => {
      logger.log("info", "server is listening on port 3000");
    });
  })
  .catch((err) => {
    logger.log("info", "Not connected to the database ", err);
    process.exit();
  });
