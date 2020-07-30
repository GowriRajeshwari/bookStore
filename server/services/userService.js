const model = require("../modal/userModal.js");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
var bookstoreModel = new model();
exports.register = (req, callback) => {
  try {
    console.log(" In service :", req.body);
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        //finding the user is already existing or not
        bookstoreModel.find({ email: req.body.email }, (err, user) => {
          if (err) {
            callback(err);
          }
          if (user) {
            var err = new Error(
              "A user with that email has already registered. Please use a different email.."
            );
            callback("Existing User");
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
