const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").config();
const auth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  jwt.verify(token, process.env.KEY, (err, result) => {
    if (err) {
      res.status(422).send(err);
    } else {
      req.decoded = result;
      next();
    }
  });
};

GenerateToken = (data_id) => {
  {
    const token = jwt.sign({ data_id }, process.env.KEY); // expires in 1 hour
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token,
    };
    return obj;
  }
};
GenerateTokenUsingRole = (data_id, role) => {
  const token = jwt.sign({ sub: data_id, role: role }, process.env.KEY);
  const obj = {
    success: true,
    message: "Token Generated Successfully!!",
    token: token,
  };
  return obj;
};
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
module.exports = {
  verify,
  authorize,
  auth,
  GenerateToken,
  GenerateTokenUsingRole,
};
