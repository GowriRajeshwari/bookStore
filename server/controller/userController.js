const userService = require("../services/userService");
exports.registerUser = (req, res) => {
  console.log(req.body);
  req
    .checkBody("fullName", "Name is invalid")
    .len({ min: 3 })
    .isAlpha()
    .notEmpty();
  req.checkBody("password", "Password is invalid").notEmpty();
  req.checkBody("email", "Email is invalid").notEmpty().isEmail();
  req.checkBody("country", "Country is invalid").notEmpty().isAlpha();
  req.checkBody("rollField", "RollField is invalid").notEmpty().isAlpha();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    let data = { message: "Invalid Input" };
    response.data = data;
    res.status(500).send(response);
    console.log("error in registration invalid input", errors);
  } else {
    console.log(req.body);
    userService.register(req, (err, data) => {
      if (err) {
        console.log(err);
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        console.log(response);
        response.message = "Register Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
exports.loginUser = (req, res) => {
  console.log("controller");
  console.log(req.body);
  req.checkBody("email", "Email is invalid").notEmpty().isEmail();
  req.checkBody("password", "Password is invalid").notEmpty();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = "Invalid Input";
    res.status(500).send(response);
    console.log("error in registration invalid input", errors);
  } else {
    console.log(req.body);
    userService.loginUser(req, (err, data) => {
      if (err) {
        console.log(err);
        response.success = false;
        response.message = err;
        console.log(err);
        res.status(500).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        console.log(response);
        response.message = "Login Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
