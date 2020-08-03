const jwt = require("jsonwebtoken");
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
module.exports = { auth, GenerateToken, GenerateTokenUsingRole };
