const userService = require("../services/user.js");
const jwt = require("../middleware/jwt.js");
const mailler = require("../middleware/nodeMailer.js");
exports.registerUser = (req, res) => {
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
    res.status(422).send(response);
  } else {
    userService.register(req, (err, data) => {
      if (err) {
        response.success = false;
        response.message = err;
        res.status(404).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        response.message = "Register Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
exports.loginUser = (req, res) => {
  req.checkBody("email", "Email is invalid").notEmpty().isEmail();
  req.checkBody("password", "Password is invalid").notEmpty();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = "Invalid Input";
    res.status(422).send(response);
  } else {
    userService.loginUser(req, (err, data) => {
      if (err) {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        response.message = "Login Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
//forgot Password
exports.forgotPassword = (req, res) => {
  req.checkBody("email", "Email is invalid").notEmpty().isEmail();
  var response = {};
  const errors = req.validationErrors();
  if (errors) {
    response.success = false;
    response.message = "Invalid Input";
    res.status(422).send(response);
  } else {
    userService.forgotPassword(req, (err, data) => {
      if (err) {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      } else {
        let data_id = data._id;
        let obj = jwt.GenerateToken(data_id);
        let url = `http://localhost:3000/resetpassword`;
        mailler.sendMailer(url, req.body.email);
        response.token = obj.token;
        response.success = true;
        response.data = data;
        response.message = "Send Mail Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
//reset Password
exports.resetPassword = (req, res) => {
  req.checkBody("password", "Password is invalid").notEmpty();
  req.checkBody("confirmPassword", "ConfirmPassword is invalid").notEmpty();
  var response = {};
  const error = req.validationErrors();
  if (req.body.password != req.body.confirmPassword) {
    res.send("Password and confirm password is not correct");
  }
  if (error) {
    response.success = false;
    response.message = err;
    res.status(422).send({ data: response });
  } else {
    userService.resetPassword(req, (err, data) => {
      if (err) {
        response.success = false;
        response.message = err;
        res.status(500).send({ data: response });
      } else {
        response.success = true;
        response.data = data;
        response.message = "Reset Password Successfully";
        res.status(200).send({ data: response });
      }
    });
  }
};
