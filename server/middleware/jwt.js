const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY;

const authorize = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(404).send({
        message: "Unauthorized user,only admin is permitted",
        error: err,
      });
    } else {
      req.decoded = result;
      if (req.decoded.role != "admin") {
        res.status(404).send({
          message: "Unauthorized user,only admin is permitted",
        });
      } else {
        next();
      }
    }
  });
};
module.exports = { authorize };
