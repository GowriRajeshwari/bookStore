const Service = require("../services/user.js");
var userService = new Service();
const jwt = require("../middleware/jwt.js");
const mailler = require("../middleware/nodeMailer.js");
const constantsParam = require("../constant/static.js");
const logger = require("../logger/logger.js");
module.exports.registerUser = (req, res) => {
  try {
    req
      .checkBody("fullName", "Name is invalid")
      .len({ min: 3 })
      .isAlpha()
      .notEmpty();
    req.checkBody("password", "Password is invalid").notEmpty();
    req.checkBody("email", "Email is invalid").notEmpty().isEmail();
    req.checkBody("country", "Country is invalid").notEmpty().isAlpha();
    req.checkBody("role", "RollField is invalid").notEmpty().isAlpha();
    var response = {};
    const errors = req.validationErrors();
    if (errors) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send({ data: response });
    } else {
      let filterData = {
        fullName: req.body.fullName,
        password: req.body.password,
        email: req.body.email,
        country: req.body.country,
        role: req.body.role,
      };
      userService.register(filterData, (err, data) => {
        if (err) {
          response.success = false;
          response.message = "registration failed";
          response.error = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.NOT_FOUND.errorResponseCode
            )
            .send(response);
        } else {
          response.success = true;
          response.message = "Register Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        }
      });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.loginUser = (req, res) => {
  try {
    req.checkBody("email", "Email is invalid").notEmpty().isEmail();
    req.checkBody("password", "Password is invalid").notEmpty();
    var response = {};
    const errors = req.validationErrors();
    if (errors) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send({ data: response });
    } else {
      let filterData = {
        email: req.body.email,
        password: req.body.password,
      };
      userService.loginUser(filterData, (err, data) => {
        if (err) {
          response.success = false;
          response.message = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                .errorResponseCode
            )
            .send({ data: response });
        } else {
          response.success = true;
          response.data = data;
          response.message = "Login Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        }
      });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.forgotPassword = (req, res) => {
  try {
    req.checkBody("email", "Email is invalid").notEmpty().isEmail();
    var response = {};
    const errors = req.validationErrors();
    if (errors) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = errors;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send({ data: response });
    } else {
      let filterData = {
        email: req.body.email,
      };
      userService.forgotPassword(filterData, (err, data) => {
        if (err) {
          response.success = false;
          response.message = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                .errorResponseCode
            )
            .send({ data: response });
        } else {
          let data_id = data._id;
          let obj = jwt.GenerateToken(data_id);
          let url = `http://localhost:3000/resetpassword`;
          mailler.sendMailer(url, req.body.email);
          response.token = obj.token;
          response.success = true;
          response.message = "Send Mail Successfully";
          // response.set("token" + obj.token);

          // response.setHeader("Authorization", "Bearer" + response.token);
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        }
      });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.resetPassword = (req, res) => {
  try {
    req.checkBody("password", "Password is invalid").notEmpty();
    req.checkBody("confirmPassword", "ConfirmPassword is invalid").notEmpty();
    var response = {};
    const error = req.validationErrors();
    if (error) {
      response.success = false;
      response.message = { message: "Invalid Input" };
      response.error = error;
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send({ data: response });
    } else if (req.body.password != req.body.confirmPassword) {
      response.success = false;
      response.message = {
        message: "Password and confirm password is not correct",
      };
      res
        .status(
          constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
        )
        .send({ data: response });
    } else {
      userService.resetPassword(req, (err, data) => {
        if (err) {
          response.success = false;
          response.message = err;
          res
            .status(
              constantsParam.staticHTTPErrorMessages.INTERNAL_SERVER_ERROR
                .errorResponseCode
            )
            .send({ data: response });
        } else {
          response.success = true;
          response.data = data;
          response.message = "Reset Password Successfully";
          res
            .status(
              constantsParam.staticHTTPErrorMessages.staticHTTPSuccessMessages
                .OK.successResponseCode
            )
            .send({ data: response });
        }
      });
    }
  } catch (err) {
    this.errorHandling(err);
  }
};
module.exports.errorHandling = (err) => {
  if (
    err instanceof SyntaxError ||
    err instanceof EvalError ||
    err instanceof RangeError ||
    err instanceof ReferenceError ||
    err instanceof TypeError
  ) {
    logger.error("Programming Error", err);
  } else {
    logger.error("UserDefined", err);
    response.success = false;
    response.message = err.message.toString();
    res
      .status(
        constantsParam.staticHTTPErrorMessages.BAD_REQUEST.errorResponseCode
      )
      .send({ data: response });
  }
};
