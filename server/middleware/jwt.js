const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.KEY;

const verify = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(404).send({
        message: "Unauthorized token",
        error: err,
      });
    } else {
      req.decoded = result;
      next();
    }
  });
};
module.exports = { verify };
