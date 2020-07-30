const model = require("../model/user.js");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
var Model = new model();
exports.register = (req, callback) => {
  try {
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        Model.find({ email: req.body.email }, (err, user) => {
          if (err) {
            callback(err);
          }
          if (user) {
            callback({
              message: "Existing User",
              error:
                "A user with that email has already registered. Please use a different email..",
            });
          } else {
            bcrypt.hash(req.body.password, 7, (err, encrypted) => {
              if (err) {
                callback("Error found while Encrypting");
              } else {
                Model.create(
                  {
                    fullName: req.body.fullName,
                    password: encrypted,
                    email: req.body.email,
                    country: req.body.country,
                    rollField: req.body.rollField,
                  },
                  (err, data) => {
                    if (err) {
                      callback(err);
                    } else {
                      callback(null, data);
                    }
                  }
                );
              }
            });
          }
        });
      } else {
        callback("Email Id not Exists");
      }
    });
  } catch (err) {}
};
exports.loginUser = (req, callback) => {
  try {
    var response = {};
    Model.find({ email: req.body.email }, (err, user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
          if (err) {
            callback(err);
          } else if (encrypted) {
            response._id = user._id;
            response.fullName = user.fullName;
            response.email = user.email;
            response.rollFiled = user.rollField;
            callback(null, response);
          } else {
            callback("Password is Incorrect");
          }
        });
      } else {
        callback({ message: "User Not Found", error: err });
      }
    });
  } catch (err) {
    callback(err);
  }
};
exports.forgotPassword = (req, callback) => {
  try {
    Model.find(
      {
        email: req.body.email,
      },
      (err, data) => {
        if (err) {
          callback(err);
        } else {
          callback(null, data);
        }
      }
    );
  } catch (err) {
    callback(err);
  }
};
exports.resetPassword = (req, callback) => {
  try {
    bcrypt.hash(req.body.password, 7, (err, encrypted) => {
      if (err) {
        callback(err);
      } else {
        Model.updateOne(
          req,
          {
            password: encrypted,
          },
          (err, data) => {
            if (err) {
              callback(err);
            } else {
              callback(null, data);
            }
          }
        );
      }
    });
  } catch (err) {
    callback(err);
  }
};
