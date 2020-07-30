const model = require("../modal/modal.js");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
var bookstoreModel = new model();
exports.register = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        bookstoreModel.find({ email: req.body.email }, (err, user) => {
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
            console.log("password", req.body.password);
            bcrypt.hash(req.body.password, 7, (err, encrypted) => {
              if (err) {
                callback("Error found while Encrypting");
              } else {
                bookstoreModel.create(
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
        callback(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
exports.loginUser = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    var response = {};
    bookstoreModel.find({ email: req.body.email }, (err, user) => {
      if (user) {
        console.log("password", req.body.password);
        bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
          if (err) {
            callback("Password is Incorrect");
          } else if (encrypted) {
            response._id = user._id;
            response.fullName = user.fullName;
            response.email = req.body.email;
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
    console.log(" In service forgotpassword :", req.body);
    bookstoreModel.find(
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
    console.log(err);
  }
};
