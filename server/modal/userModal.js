const mongoose = require("mongoose");
const emailExistance = require("email-existence");
const bcrypt = require("bcryptjs");
//schema for registration of new user
const registration = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "full name must be provided"],
    },
    password: {
      type: String,
      required: [true, "Password cannot be left blank"],
    },
    email: {
      type: String,
      required: [true, "Email address cannot be left blank"],
    },
    country: {
      type: String,
      required: [true, "country cannot be left blank"],
    },
    rollField: {
      type: String,
      required: [true, "rollField cannot be left blank"],
    },
  },
  {
    timestamps: true,
  }
);
var registerUser = mongoose.model("register", registration);
exports.registerUser;

exports.userreg = (req, callback) => {
  try {
    console.log("In model", req.body.email);
    emailExistance.check(req.body.email, (err, response) => {
      if (response) {
        //finding the user is already existing or not
        registerUser.findOne({ email: req.body.email }, (err, user) => {
          console.log("user", user);
          if (err) {
            console.log("Error in findone");
            callback(err);
          }

          //if a user was found, that means the user's email matches the entered email
          if (user) {
            var err = new Error(
              "A user with that email has already registered. Please use a different email.."
            );
            callback("Existing User");
          } else {
            //code if no user with entered email was found
            console.log("password", req.body.password);
            bcrypt.hash(req.body.password, 7, (err, encrypted) => {
              console.log(encrypted);
              if (err) {
                console.log("err find it out");
              } else {
                var register = registerUser({
                  fullName: req.body.fullName,
                  password: encrypted,
                  email: req.body.email,
                  country: req.body.country,
                  rollField: req.body.rollField,
                });
                // Save User in the database
                register
                  .save()
                  .then((data) => {
                    // res.send(data);
                    callback(null, data);
                  })
                  .catch((err) => {
                    callback(err);
                  });
              }
            });
          }
        });
      } else {
        console.log(err);
        callback("Email Id is not valid check with email is exist or not");
      }
    });
  } catch (err) {
    callback("Email is not Exist");
    console.log(err);
  }
};
exports.userLogin = (req, callback) => {
  try {
    var response = {};
    registerUser.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        console.log("password", req.body.password);
        bcrypt.compare(req.body.password, user.password, (err, encrypted) => {
          console.log(encrypted);
          if (err) {
            console.log("err find it out");
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
        callback("User Not Found");
        console.log("User Not Found");
      }
    });
  } catch (err) {
    console.log("err in userlogin", err);
  }
};
