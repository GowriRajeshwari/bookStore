const model = require("../model/user.js");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userModel = new model();

exports.register = (req, callback) => {
  try {
    emailExistance.check(req.email, (err, response) => {
      console.log(response);
      if (response) {
        let email = {
          email: req.email,
        };
        userModel.find(email, (err, user) => {
          if (err) {
            return callback(err, null);
          }
          if (user) {
            return callback({
              message: "Existing User",
              error:
                "A user with that email has already registered. Please use a different email..",
            });
          } else {
            bcrypt.hash(req.password, 7, (err, encrypted) => {
              if (err) {
                return callback("Error found while Encrypting");
              } else {
                let filterData = {
                  fullName: req.fullName,
                  password: encrypted,
                  email: req.email,
                  country: req.country,
                  role: req.role,
                };
                userModel.create(filterData, (err, data) => {
                  if (err) {
                    return callback(err, null);
                  } else {
                    return callback(null, data);
                  }
                });
              }
            });
          }
        });
      } else if (err) {
        return callback(err, null);
      } else {
        return callback("Email does Not exists");
      }
    });
  } catch (err) {
    return callback(err, null);
  }
};
exports.loginUser = (req, callback) => {
  try {
    var response = {};
    let email = {
      email: req.email,
    };
    userModel.find(email, (err, user) => {
      if (user) {
        bcrypt.compare(req.password, user.password, (err, encrypted) => {
          if (err) {
            return callback(err, null);
          } else if (encrypted) {
            const token = jwt.sign(
              { sub: user._id, role: user.role },
              process.env.KEY
            );
            response._id = user._id;
            response.fullName = user.fullName;
            response.email = user.email;
            response.role = user.role;
            response.token = token;
            return callback(null, response);
          } else {
            return callback("Password is Incorrect");
          }
        });
      } else if (err) {
        return callback(err, null);
      } else {
        return callback({ message: "User Not Found" });
      }
    });
  } catch (err) {
    return callback(err);
  }
};
exports.forgotPassword = (req, callback) => {
  try {
    emailExistance.check(req.email, (err, response) => {
      if (response) {
        let email = {
          email: req.email,
        };
        userModel.find(email, (err, data) => {
          if (err) {
            return callback(err, null);
          } else {
            return callback(null, data);
          }
        });
      } else if (err) {
        return callback(err, null);
      } else {
        return callback("Email does Not exists");
      }
    });
  } catch (err) {
    return callback(err);
  }
};
exports.resetPassword = (req, callback) => {
  try {
    bcrypt.hash(req.body.password, 7, (err, encrypted) => {
      if (err) {
        return callback(err);
      } else {
        let password = {
          password: encrypted,
        };
        userModel.updateOne(req, password, (err, data) => {
          if (err) {
            return callback(err);
          } else {
            return callback(null, data);
          }
        });
      }
    });
  } catch (err) {
    return callback(err);
  }
};
